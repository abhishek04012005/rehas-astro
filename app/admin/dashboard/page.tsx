"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./overviewDashboard.module.css";

interface DashboardSummary {
  contacts: number;
  enquiries: number;
  kundli: number;
  contactsNew: number;
  contactsResolved: number;
  enquiriesNew: number;
  enquiriesCompleted: number;
  kundliNew: number;
  kundliCompleted: number;
}

interface ListItem {
  id: string;
  name?: string;
  full_name?: string;
  phone?: string;
  message?: string;
  service_type?: string;
  birth_date?: string;
  birth_place?: string;
  status?: string;
  created_at?: string;
}

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [contacts, setContacts] = useState<ListItem[]>([]);
  const [enquiries, setEnquiries] = useState<ListItem[]>([]);
  const [kundli, setKundli] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/overview", { cache: "no-store" });
        if (!res.ok) {
          setSummary(null);
          setContacts([]);
          setEnquiries([]);
          setKundli([]);
          return;
        }

        const payload = await res.json();
        setSummary(payload.summary);
        setContacts(payload.contacts || []);
        setEnquiries(payload.enquiries || []);
        setKundli(payload.kundli || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const renderTable = (items: ListItem[], type: "contact" | "enquiry" | "kundli") => {
    if (!items.length) {
      return <div className={styles.emptyState}>No recent submissions found.</div>;
    }

    const headers =
      type === "contact"
        ? ["Name", "Phone", "Message", "Status"]
        : type === "enquiry"
          ? ["Name", "Phone", "Service", "Status"]
          : ["Name", "Phone", "Birth Date", "Birth Place", "Status"];

    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const title = item.full_name || item.name || "Unknown";
              const meta =
                type === "contact"
                  ? item.message || "Contact submission"
                  : type === "enquiry"
                    ? item.service_type || "Service enquiry"
                    : `${item.birth_date || ""}${item.birth_date && item.birth_place ? " • " : ""}${item.birth_place || ""}`;

              return (
                <tr key={item.id}>
                  <td>
                    <div className={styles.tableTitle}>{title}</div>
                    {type === "contact" ? <div className={styles.tableMeta}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</div> : null}
                  </td>
                  <td>
                    <div className={styles.tableMeta}>{item.phone || "—"}</div>
                  </td>
                  <td>
                    <div className={styles.tableMeta}>{type === "contact" ? meta : type === "enquiry" ? meta : item.birth_date || "—"}</div>
                  </td>
                  {type === "kundli" ? (
                    <td>
                      <div className={styles.tableMeta}>{item.birth_place || "—"}</div>
                    </td>
                  ) : null}
                  <td>
                    <span className={styles.badge}>{item.status || "new"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Admin Overview</h1>
          <p>Track recent enquiries, contact submissions, and kundli requests from REHAS in one place.</p>
        </section>

        {loading ? (
          <section className={styles.section}>
            <div className={styles.emptyState}>Loading dashboard...</div>
          </section>
        ) : summary ? (
          <>
            <section className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <h2>Contacts</h2>
                <div className={styles.summaryValue}>{summary.contacts}</div>
                <div className={styles.summaryMeta}>{summary.contactsNew} new · {summary.contactsResolved} resolved</div>
              </div>
              <div className={styles.summaryCard}>
                <h2>Enquiries</h2>
                <div className={styles.summaryValue}>{summary.enquiries}</div>
                <div className={styles.summaryMeta}>{summary.enquiriesNew} new · {summary.enquiriesCompleted} completed</div>
              </div>
              <div className={styles.summaryCard}>
                <h2>Kundli Requests</h2>
                <div className={styles.summaryValue}>{summary.kundli}</div>
                <div className={styles.summaryMeta}>{summary.kundliNew} new · {summary.kundliCompleted} completed</div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Recent Contacts</h3>
                <Link href="/admin/contacts">View all</Link>
              </div>
              {renderTable(contacts, "contact")}
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Recent Enquiries</h3>
                <Link href="/admin/enquiries">View all</Link>
              </div>
              {renderTable(enquiries, "enquiry")}
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Recent Kundli Requests</h3>
                <Link href="/admin/kundli">View all</Link>
              </div>
              {renderTable(kundli, "kundli")}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
