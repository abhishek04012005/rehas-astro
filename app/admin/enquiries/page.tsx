"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InboxOutlined, Phone, Search, WhatsApp } from "@mui/icons-material";
import { supabase } from "@/lib/supabase";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "./enquiryDashboard.module.css";

interface Enquiry {
  id: number;
  name: string;
  phone: string;
  service_type: string;
  status: string;
  submitted_from: string;
  website?: string | null;
  created_at: string;
  updated_at: string;
}

export default function EnquiriesPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [filtered, setFiltered] = useState<Enquiry[]>([]);
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
          .from("enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        const list = (data || []) as Enquiry[];
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
      list = list.filter((item) =>
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.service_type.toLowerCase().includes(q)
      );
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
      completed: 0,
      spam: 0,
    };

    rows.forEach((item) => {
      const status = item.status?.toLowerCase() || "new";
      if (status === "new") counts.new += 1;
      if (status === "contacted") counts.contacted += 1;
      if (status === "completed") counts.completed += 1;
      if (status === "spam") counts.spam += 1;
    });

    return counts;
  }, [rows]);

  const getBadgeClass = (value: string) => {
    switch (value) {
      case "new":
        return styles.badgeNew;
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

    setRows((current) =>
      current.map((item) => (item.id === id ? { ...item, status: value } : item))
    );

    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: value, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error(error);
      setRows((current) =>
        current.map((item) => (item.id === id ? { ...item, status: previousValue } : item))
      );
    }
  };

  return (
      <main className={styles.dashboard}>
        <div style={{ padding: "1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
          <Breadcrumbs items={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Service Enquiries" }]} />
        </div>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Enquiry Dashboard</h1>
          <p>Track every service enquiry with a full-width view, contact actions, and website origin.</p>
        </section>

        <section className={styles.controls}>
          <label className={styles.searchBox}>
            <Search />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or service"
            />
          </label>

          <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="spam">Spam</option>
          </select>
        </section>

        <section className={styles.overviewGrid}>
          <article className={styles.overviewCard}>
            <span className={styles.cardLabel}>Total enquiries</span>
            <strong className={styles.cardValue}>{overviewStats.total}</strong>
            <span className={styles.cardHint}>All submissions received</span>
          </article>
          <article className={`${styles.overviewCard} ${styles.cardNew}`}>
            <span className={styles.cardLabel}>New</span>
            <strong className={styles.cardValue}>{overviewStats.new}</strong>
            <span className={styles.cardHint}>Ready to follow up</span>
          </article>
          <article className={`${styles.overviewCard} ${styles.cardContacted}`}>
            <span className={styles.cardLabel}>Contacted</span>
            <strong className={styles.cardValue}>{overviewStats.contacted}</strong>
            <span className={styles.cardHint}>In conversation</span>
          </article>
          <article className={`${styles.overviewCard} ${styles.cardCompleted}`}>
            <span className={styles.cardLabel}>Completed</span>
            <strong className={styles.cardValue}>{overviewStats.completed}</strong>
            <span className={styles.cardHint}>Successfully closed</span>
          </article>
        </section>

        <section className={styles.tableSection}>
          {loading ? (
            <div className={styles.emptyState}>Loading enquiries...</div>
          ) : filtered.length ? (
            <>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Website</th>
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
                          <span className={styles.serviceBadge}>{item.service_type}</span>
                        </td>
                        <td>
                          <span className={styles.websiteBadge}>{item.website || item.submitted_from || "Website"}</span>
                        </td>
                        <td>
                          <select
                            className={`${styles.statusSelect} ${getBadgeClass(item.status)}`}
                            value={item.status}
                            onChange={(event) => handleStatusChange(item.id, event.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.pagination}>
                <div className={styles.paginationLeft}>
                  <button className={styles.paginationBtn} disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    Previous
                  </button>
                  <button className={styles.paginationBtn} disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                    Next
                  </button>
                </div>
                <div className={styles.paginationRight}>
                  <label htmlFor="perPage">Items per page</label>
                  <select id="perPage" className={styles.select} value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={0}>All</option>
                  </select>
                  <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <InboxOutlined className={styles.emptyIcon} />
              <h3>No enquiries found</h3>
              <p>Try adjusting your filters or wait for a new submission.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
