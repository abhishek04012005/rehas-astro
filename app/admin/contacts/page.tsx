"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageOutlined, Phone, Search, WhatsApp } from "@mui/icons-material";
import { supabase } from "@/lib/supabase";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import styles from "./contactDashboard.module.css";

interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  message: string;
  status: string;
  website?: string | null;
  created_at: string;
  updated_at: string;
}

export default function ContactsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ContactSubmission[]>([]);
  const [filtered, setFiltered] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    if (!session) {
      router.replace("/admin");
      return;
    }

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        const list = (data || []) as ContactSubmission[];
        setRows(list);
        setFiltered(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  useEffect(() => {
    let list = rows;
    const q = search.trim().toLowerCase();

    if (q) {
      list = list.filter((item) => {
        const haystack = `${item.name} ${item.phone} ${item.message}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    if (status !== "all") {
      list = list.filter((item) => item.status === status);
    }

    setFiltered(list);
    setPage(1);
  }, [rows, search, status]);

  const effectivePerPage = perPage === 0 ? filtered.length : perPage;
  const totalPages = Math.max(1, Math.ceil(filtered.length / effectivePerPage));
  const paged = useMemo(() => {
    const start = (page - 1) * effectivePerPage;
    return filtered.slice(start, start + effectivePerPage);
  }, [filtered, page, effectivePerPage]);

  const overviewStats = useMemo(() => {
    const counts = {
      total: rows.length,
      new: 0,
      contacted: 0,
      resolved: 0,
      spam: 0,
    };

    rows.forEach((item) => {
      const status = item.status?.toLowerCase() || "new";
      if (status === "new") counts.new += 1;
      if (status === "contacted" || status === "responded") counts.contacted += 1;
      if (status === "resolved") counts.resolved += 1;
      if (status === "spam") counts.spam += 1;
    });

    return counts;
  }, [rows]);

  const getBadgeClass = (value: string) => {
    switch (value) {
      case "new":
        return styles.badgeNew;
      case "contacted":
      case "responded":
        return styles.badgeContacted;
      case "resolved":
        return styles.badgeResolved;
      case "spam":
        return styles.badgeSpam;
      default:
        return styles.badgeNeutral;
    }
  };

  const handleStatusChange = async (id: number, value: string) => {
    const previousValue = rows.find((item) => item.id === id)?.status ?? "new";

    setRows((current) => current.map((item) => (item.id === id ? { ...item, status: value } : item)));

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status: value, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error(error);
      setRows((current) => current.map((item) => (item.id === id ? { ...item, status: previousValue } : item)));
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className={styles.dashboard}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <h1>Contact Dashboard</h1>
            <p>Manage incoming website contact requests, respond quickly, and keep every lead organised with the REHAS style.</p>
          </section>

          <section className={styles.controls}>
            <label className={styles.searchBox}>
              <Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone, or message"
              />
            </label>

            <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="responded">Responded</option>
              <option value="resolved">Resolved</option>
              <option value="spam">Spam</option>
            </select>
          </section>

          <section className={styles.overviewGrid}>
            <article className={styles.overviewCard}>
              <span className={styles.cardLabel}>Total contacts</span>
              <strong className={styles.cardValue}>{overviewStats.total}</strong>
              <span className={styles.cardHint}>All submissions received</span>
            </article>
            <article className={`${styles.overviewCard} ${styles.cardNew}`}>
              <span className={styles.cardLabel}>New</span>
              <strong className={styles.cardValue}>{overviewStats.new}</strong>
              <span className={styles.cardHint}>Awaiting attention</span>
            </article>
            <article className={`${styles.overviewCard} ${styles.cardContacted}`}>
              <span className={styles.cardLabel}>Followed up</span>
              <strong className={styles.cardValue}>{overviewStats.contacted}</strong>
              <span className={styles.cardHint}>In conversation</span>
            </article>
            <article className={`${styles.overviewCard} ${styles.cardResolved}`}>
              <span className={styles.cardLabel}>Resolved</span>
              <strong className={styles.cardValue}>{overviewStats.resolved}</strong>
              <span className={styles.cardHint}>Successfully closed</span>
            </article>
          </section>

          <section className={styles.tableSection}>
            {loading ? (
              <div className={styles.emptyState}>Loading contacts...</div>
            ) : filtered.length ? (
              <>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paged.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className={styles.nameCell}>{item.name}</div>
                          </td>
                          <td>
                            <div className={styles.phoneCell}>{item.phone}</div>
                          </td>
                          <td>
                            <div className={styles.messageCell}>{item.message}</div>
                          </td>
                          <td>
                            <span className={styles.websiteBadge}>{item.website || "Website"}</span>
                          </td>
                          <td>
                            <select
                              className={`${styles.statusSelect} ${getBadgeClass(item.status)}`}
                              value={item.status}
                              onChange={(event) => handleStatusChange(item.id, event.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="responded">Responded</option>
                              <option value="resolved">Resolved</option>
                              <option value="spam">Spam</option>
                            </select>
                          </td>
                          <td>
                            <div className={styles.dateCell}>{new Date(item.created_at).toLocaleDateString("en-IN")}</div>
                          </td>
                          <td>
                            <div className={styles.actions}>
                              <a href={`tel:${item.phone}`} className={styles.iconBtn} aria-label="Call">
                                <Phone />
                              </a>
                              <a href={`https://wa.me/${item.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className={styles.iconBtnWa} aria-label="WhatsApp">
                                <WhatsApp />
                              </a>
                              <a href={`mailto:${item.phone}`} className={styles.iconBtn} aria-label="Message">
                                <MessageOutlined />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={styles.pagination}>
                  <button className={styles.pageBtn} onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1}>
                    Previous
                  </button>
                  <span className={styles.pageInfo}>
                    Page {page} of {totalPages}
                  </span>
                  <button className={styles.pageBtn} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page === totalPages}>
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>No contact submissions found for the current filters.</div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
