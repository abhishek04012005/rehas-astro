"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Search, WhatsApp, Schedule, Place, Person } from "@mui/icons-material";
import { supabase } from "@/lib/supabase";
import { AdminNavbar } from "@/components/layout/AdminNavbar";
import styles from "./kundliDashboard.module.css";

interface KundliSubmission {
  id: number;
  full_name: string;
  phone: string;
  birth_date: string;
  birth_time: string;
  birth_place: string;
  status: string;
  website?: string | null;
  created_at: string;
  updated_at: string;
}

export default function KundliDashboardPage() {
  const router = useRouter();
  const [rows, setRows] = useState<KundliSubmission[]>([]);
  const [filtered, setFiltered] = useState<KundliSubmission[]>([]);
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
          .from("kundli_enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        const list = (data || []) as KundliSubmission[];
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
        const haystack = `${item.full_name} ${item.phone} ${item.birth_date} ${item.birth_place}`.toLowerCase();
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
      in_progress: 0,
      completed: 0,
      spam: 0,
    };

    rows.forEach((item) => {
      const status = item.status?.toLowerCase() || "new";
      if (status === "new") counts.new += 1;
      if (status === "in_progress" || status === "in-progress" || status === "contacted") counts.in_progress += 1;
      if (status === "completed") counts.completed += 1;
      if (status === "spam") counts.spam += 1;
    });

    return counts;
  }, [rows]);

  const getBadgeClass = (value: string) => {
    switch (value) {
      case "new":
        return styles.badgeNew;
      case "in_progress":
      case "in-progress":
      case "contacted":
        return styles.badgeContacted;
      case "completed":
        return styles.badgeCompleted;
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
        .from("kundli_enquiries")
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
            <h1>Kundli Dashboard</h1>
            <p>Review and manage Kundli requests with the same elegant REHAS dashboard experience.</p>
          </section>

          <section className={styles.controls}>
            <label className={styles.searchBox}>
              <Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone, date, or place"
              />
            </label>

            <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="spam">Spam</option>
            </select>
          </section>

          <section className={styles.overviewGrid}>
            <article className={styles.overviewCard}>
              <span className={styles.cardLabel}>Total requests</span>
              <strong className={styles.cardValue}>{overviewStats.total}</strong>
              <span className={styles.cardHint}>All Kundli submissions</span>
            </article>
            <article className={`${styles.overviewCard} ${styles.cardNew}`}>
              <span className={styles.cardLabel}>New</span>
              <strong className={styles.cardValue}>{overviewStats.new}</strong>
              <span className={styles.cardHint}>New Kundli requests</span>
            </article>
            <article className={`${styles.overviewCard} ${styles.cardContacted}`}>
              <span className={styles.cardLabel}>In progress</span>
              <strong className={styles.cardValue}>{overviewStats.in_progress}</strong>
              <span className={styles.cardHint}>Currently being processed</span>
            </article>
            <article className={`${styles.overviewCard} ${styles.cardCompleted}`}>
              <span className={styles.cardLabel}>Completed</span>
              <strong className={styles.cardValue}>{overviewStats.completed}</strong>
              <span className={styles.cardHint}>Delivered or closed</span>
            </article>
          </section>

          <section className={styles.tableSection}>
            {loading ? (
              <div className={styles.emptyState}>Loading Kundli submissions...</div>
            ) : filtered.length ? (
              <>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Birth date</th>
                        <th>Birth time</th>
                        <th>Birth place</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paged.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className={styles.nameCell}>{item.full_name}</div>
                          </td>
                          <td>
                            <div className={styles.phoneCell}>{item.phone}</div>
                          </td>
                          <td>
                            <div className={styles.detailCell}>
                              <Schedule className={styles.detailIcon} />
                              {item.birth_date}
                            </div>
                          </td>
                          <td>
                            <div className={styles.detailCell}>
                              <Schedule className={styles.detailIcon} />
                              {item.birth_time}
                            </div>
                          </td>
                          <td>
                            <div className={styles.detailCell}>
                              <Place className={styles.detailIcon} />
                              {item.birth_place}
                            </div>
                          </td>
                          <td>
                            <select
                              className={`${styles.statusSelect} ${getBadgeClass(item.status)}`}
                              value={item.status}
                              onChange={(event) => handleStatusChange(item.id, event.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In progress</option>
                              <option value="completed">Completed</option>
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
                              <a href={`mailto:${item.phone}`} className={styles.iconBtn} aria-label="Compose email">
                                <Person />
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
              <div className={styles.emptyState}>No Kundli submissions found for the current filters.</div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
