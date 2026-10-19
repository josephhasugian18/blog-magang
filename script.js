(function () {

  if (typeof INTERNSHIP_CONFIG === "undefined") {
    console.error("[blog-magang] assets/config.js tidak termuat. Pastikan file ada di assets/config.js dan tidak ada typo.");
  }
  const cfg = typeof INTERNSHIP_CONFIG !== "undefined" ? INTERNSHIP_CONFIG : {};
  cfg.profile = cfg.profile || {};
  cfg.teammates = Array.isArray(cfg.teammates) ? cfg.teammates : [];

  const data = typeof LOGBOOK_ENTRIES !== "undefined" && Array.isArray(LOGBOOK_ENTRIES) ? LOGBOOK_ENTRIES : [];
  const DAY_MS = 86400000;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
  });

  function mondayOf(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }

  // Nomor minggu magang (Senin–Minggu); minggu 1 = minggu yang memuat startDate
  function weekNo(date) {
    const start = new Date(cfg.startDate + "T00:00:00");
    return Math.round((mondayOf(date) - mondayOf(start)) / (DAY_MS * 7)) + 1;
  }

  function formatDate(isoDate) {
    const d = new Date(isoDate + "T00:00:00");
    if (isNaN(d.getTime())) return isoDate;
    return dateFormatter.format(d).replace(".", "");
  }

  /* ---------------------------------------------------
     STATUS PILL + KPI (dihitung dari tanggal hari ini)
  --------------------------------------------------- */
  function countWeekdays(startDate, endDate) {
    if (startDate > endDate) return 0;
    let count = 0;
    const cur = new Date(startDate);
    while (cur <= endDate) {
      const day = cur.getDay(); // 0 = Minggu, 6 = Sabtu
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }

  function computeTiming() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(cfg.startDate + "T00:00:00");
    const end = new Date(cfg.endDate + "T00:00:00");

    const totalWorkDays = Math.max(1, countWeekdays(start, end));

    if (today < start) {
      return { label: "Belum dimulai", week: "—", elapsed: "0 hari", remaining: "—", percent: 0 };
    }

    if (today > end) {
      return {
        label: "Magang selesai",
        week: "Selesai",
        elapsed: `${totalWorkDays} hari`,
        remaining: "0",
        percent: 100,
      };
    }

    const totalWeeks = weekNo(end);
    const week = Math.min(totalWeeks, weekNo(today));

    const elapsedWorkDays = countWeekdays(start, today);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const remainingWorkDays = countWeekdays(tomorrow, end);
    const percent = Math.min(100, Math.round((elapsedWorkDays / totalWorkDays) * 100));

    return {
      label: `Magang aktif · Minggu ke-${week}`,
      week: `${week} / ${totalWeeks}`,
      elapsed: `${elapsedWorkDays} hari`,
      remaining: `${remainingWorkDays} hari`,
      percent,
    };
  }

  function renderStatusAndKpi() {
    const timing = computeTiming();

    setKpi("kpi-entries", new Set(data.map((e) => weekNo(new Date(e.date + "T00:00:00")))).size);
    setKpi("kpi-week", timing.week);
    setKpi("kpi-elapsed", timing.elapsed);
    setKpi("kpi-remaining", timing.remaining);

    const fillEl = document.getElementById("kpi-progress-fill");
    if (fillEl) fillEl.style.width = `${timing.percent}%`;

    const progressLabelEl = document.getElementById("kpi-progress-label");
    if (progressLabelEl) progressLabelEl.textContent = `${timing.percent}% magang selesai`;
  }

  function setKpi(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* ---------------------------------------------------
     HEADER PROFILE 
  --------------------------------------------------- */
  function renderProfileHeader() {
    const p = cfg.profile || {};

    const nameEl = document.getElementById("profile-name");
    if (nameEl) nameEl.textContent = p.name || "";

    const nimEl = document.getElementById("profile-nim");
    if (nimEl) nimEl.textContent = p.nim ? `NIM ${p.nim}` : "";

    const programEl = document.getElementById("profile-program");
    if (programEl) programEl.textContent = p.program || "";
  }

  /* ---------------------------------------------------
     LOGBOOK MINGGUAN
  --------------------------------------------------- */
  const SUMMARIES = typeof WEEKLY_SUMMARIES !== "undefined" && WEEKLY_SUMMARIES ? WEEKLY_SUMMARIES : {};
  const shortMonth = new Intl.DateTimeFormat("id-ID", { month: "short" });
  const dayFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "2-digit", month: "short" });

  function weekRangeLabel(no) {
    const start = new Date(cfg.startDate + "T00:00:00");
    const end = new Date(cfg.endDate + "T00:00:00");
    let from = mondayOf(start);
    from.setDate(from.getDate() + (no - 1) * 7);
    let to = new Date(from);
    to.setDate(to.getDate() + 4); // Senin–Jumat
    if (from < start) from = start;
    if (to > end) to = end;
    const m1 = shortMonth.format(from).replace(".", "");
    const m2 = shortMonth.format(to).replace(".", "");
    const left = m1 === m2 ? `${from.getDate()}` : `${from.getDate()} ${m1}`;
    return `${left} – ${to.getDate()} ${m2} ${to.getFullYear()}`;
  }

  function groupByWeek(list) {
    const map = new Map();
    list.forEach((entry) => {
      const d = new Date(entry.date + "T00:00:00");
      if (isNaN(d.getTime())) return;
      const no = weekNo(d);
      if (!map.has(no)) map.set(no, []);
      map.get(no).push(entry);
    });
    return [...map.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([no, entries]) => ({ no, entries }));
  }

  function renderStats() {
    const el = document.getElementById("logbook-stats");
    if (!el) return;
    const weeks = new Set(data.map((e) => weekNo(new Date(e.date + "T00:00:00")))).size;
    el.textContent = `${weeks} minggu · ${data.length} kegiatan tercatat`;
  }

  function renderEntries(filter) {
    const entriesEl = document.getElementById("entries");
    entriesEl.innerHTML = "";

    const sorted = [...data].sort((a, b) => (a.date < b.date ? 1 : -1));
    const filtered = sorted;

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "entries-empty";
      empty.textContent = "Belum ada kegiatan.";
      entriesEl.appendChild(empty);
      return;
    }

    groupByWeek(filtered).forEach((week, index) => {
      const sum = SUMMARIES[week.no] || {};
      const details = document.createElement("details");
      details.className = `week-row wk-${week.no % 4}`;
      if (index === 0) details.open = true;

      const days = week.entries
        .map((entry) => {
          const d = new Date(entry.date + "T00:00:00");
          const label = dayFormatter.format(d).replace(/\./g, "");
          const statusHtml = entry.status
            ? `<span class="entry-status" data-status="${esc(entry.statusType || "info")}">${esc(entry.status)}</span>`
            : "";
          return `
            <li class="day-item">
              <span class="day-date">${esc(label)}</span>
              <div class="day-main">
                <h4 class="day-title">${esc(entry.title)} ${statusHtml}</h4>
                <p class="day-body">${esc(entry.body)}</p>
              </div>
            </li>`;
        })
        .join("");

      details.innerHTML = `
        <summary>
          <span class="week-num"><small>Minggu</small>${String(week.no).padStart(2, "0")}</span>
          <span class="week-main">
            <span class="week-range">${esc(weekRangeLabel(week.no))}</span>
            <span class="week-title">${esc(sum.title || `${week.entries.length} kegiatan harian`)}</span>
          </span>
          <span class="week-count">${week.entries.length}<small>kegiatan</small></span>
          <span class="week-chevron">▸</span>
        </summary>
        <div class="week-body">
          ${sum.body ? `<p class="week-summary">${esc(sum.body)}</p>` : ""}
          <ol class="day-list">${days}</ol>
        </div>
      `;
      entriesEl.appendChild(details);
    });
  }

  /* ---------------------------------------------------
     TENTANG (ABOUT)
  --------------------------------------------------- */
  function renderAboutGroups() {
    const el = document.getElementById("about-groups");
    if (!el || !cfg.profile) return;

    const p = cfg.profile;

    const groups = [
      {
        label: "Profil peserta",
        photo: cfg.profilePhoto,
        rows: [
          ["Nama", p.name],
          ["NIM", p.nim],
          ["PRODI", p.program],
          ["Fakultas", p.faculty],
        ],
      },
      {
        label: "Detail penempatan",
        logo: true,
        rows: [
          ["Perusahaan", p.company],
          ["Lokasi", p.companyLocation],
          ["Mentor", p.supervisor],
          ["Periode", `${formatPeriodStart(cfg.startDate, cfg.endDate)} - ${formatFullDate(cfg.endDate)}`],
        ],
      },
    ];

    el.innerHTML = groups
      .map(
        (group) => `
        <div class="about-group">
          <div class="about-group-head">
            <p class="about-group-label">${group.label}</p>
          </div>
          <div class="about-profile">
            ${group.photo ? `<img class="about-photo" src="${esc(group.photo)}" alt="Foto ${esc(p.name)}" onerror="this.remove()" />` : ""}
            ${group.logo ? `<img class="company-logo" id="company-logo" alt="Logo PT Laksita Emi Saguna" style="display: none;" />` : ""}
            <dl>
              ${group.rows
                .map(([label, value]) => `<div class="about-row"><dt>${label}</dt><dd>${esc(value)}</dd></div>`)
                .join("")}
            </dl>
          </div>
        </div>
      `
      )
      .join("");
  }

  // "26 Agustus" jika tahun mulai & selesai sama, selain itu "26 Agustus 2026"
  function formatPeriodStart(start, end) {
    const full = formatFullDate(start);
    return start.slice(0, 4) === end.slice(0, 4) ? full.replace(/\s\d{4}$/, "") : full;
  }

  function formatFullDate(isoDate) {
    const d = new Date(isoDate + "T00:00:00");
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(d);
  }

  /* ---------------------------------------------------
     LOGO PERUSAHAAN
  --------------------------------------------------- */
  function renderCompanyLogo() {
    if (!cfg.companyLogo) return;
    ["hero-logo", "company-logo"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.onerror = () => { el.style.display = "none"; };
      el.onload = () => { el.style.display = "block"; };
      el.src = cfg.companyLogo;
    });
  }

  /* ---------------------------------------------------
     INIT
  --------------------------------------------------- */
  renderStatusAndKpi();
  renderProfileHeader();
  renderStats();
  renderEntries("Semua");
  renderAboutGroups();
  renderCompanyLogo();

  /* ---------------------------------------------------
     GALERI KIRI-KANAN (geser / tombol panah)
  --------------------------------------------------- */
  (function initGallery() {
    const g = document.getElementById("gallery");
    const prev = document.getElementById("doc-prev");
    const next = document.getElementById("doc-next");
    const controls = document.getElementById("doc-controls");
    if (!g || !prev || !next) return;

    function step() {
      const card = g.querySelector(".doc-item");
      return card ? card.getBoundingClientRect().width + 24 : g.clientWidth * 0.8;
    }
    function update() {
      const max = g.scrollWidth - g.clientWidth - 2;
      const overflow = max > 0;
      if (controls) controls.style.visibility = overflow ? "visible" : "hidden";
      prev.disabled = g.scrollLeft <= 2;
      next.disabled = g.scrollLeft >= max;
    }
    prev.addEventListener("click", () => g.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => g.scrollBy({ left: step(), behavior: "smooth" }));
    g.addEventListener("scroll", update, { passive: true });
    g.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    update();
  })();

  /* ---------------------------------------------------
     NAVIGASI AKTIF (scroll-spy)
  --------------------------------------------------- */
  (function initNav() {
    const links = document.querySelectorAll(".nav-link");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = {};
    links.forEach((l) => { map[l.dataset.target] = l; });
    const io = new IntersectionObserver((items) => {
      items.forEach((it) => {
        if (!it.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        const l = map[it.target.id];
        if (l) l.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  })();

  /* ---------------------------------------------------
     KURSOR LINGKARAN (hanya jika ada mouse)
  --------------------------------------------------- */
  (function initCursor() {
    const el = document.getElementById("cursor");
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      if (!el.classList.contains("is-visible")) { cx = x; cy = y; el.classList.add("is-visible"); }
      if (!raf) loop();
    });
    document.addEventListener("mouseleave", () => el.classList.remove("is-visible"));
    document.addEventListener("mouseover", (e) => {
      el.classList.toggle("is-big", !!e.target.closest("a, button, summary"));
    });
  })();

  /* ---------------------------------------------------
     ANIMASI MUNCUL SAAT SCROLL
  --------------------------------------------------- */
  (function initReveal() {
    const targets = document.querySelectorAll(".kpi-strip, main > section:not(.hero)");
    if (!("IntersectionObserver" in window) || !targets.length) return;
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver((items) => {
      items.forEach((it) => {
        if (it.isIntersecting) { it.target.classList.add("is-visible"); io.unobserve(it.target); }
      });
    }, { threshold: 0.08 });
    targets.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  })();
})();