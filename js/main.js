/* ==========================================================================
   main.js — no dependencies, no build step.
   Sections: nav, scroll reveal, hero topology lines, status type-on effect,
   contact form (mailto fallback), footer helpers.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll(
    ".section-title, .section-lede, .about-grid, .skill-card, .timeline-item, .project-card, .doc-card, .cert-empty, .milestone-list, .contact-grid"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- Hero status "boot" line ---------------- */
  const statusLine = document.getElementById("statusLine");
  if (statusLine && !reduceMotion) {
    const full = statusLine.textContent.trim();
    statusLine.textContent = "";
    let i = 0;
    const typer = setInterval(() => {
      statusLine.textContent = full.slice(0, i + 1);
      i++;
      if (i >= full.length) clearInterval(typer);
    }, 35);
  }

  /* ---------------- Hero topology connecting lines ---------------- */
  const svg = document.getElementById("topology");
  const lineGroup = document.getElementById("topo-lines");
  if (svg && lineGroup) {
    const center = { x: 210, y: 210 };
    const outerCoords = [
      { x: 210, y: 46 },
      { x: 360, y: 130 },
      { x: 360, y: 300 },
      { x: 210, y: 384 },
      { x: 60, y: 300 },
      { x: 60, y: 130 },
    ];

    outerCoords.forEach((pt, idx) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", center.x);
      line.setAttribute("y1", center.y);
      line.setAttribute("x2", pt.x);
      line.setAttribute("y2", pt.y);
      line.setAttribute("class", "topo-line");

      if (!reduceMotion) {
        const length = Math.hypot(pt.x - center.x, pt.y - center.y);
        line.style.strokeDasharray = String(length);
        line.style.strokeDashoffset = String(length);
        line.style.transition = `stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) ${0.15 * idx}s`;
      }
      lineGroup.appendChild(line);
    });

    // trigger draw-in after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lineGroup.querySelectorAll("line").forEach((l) => {
          l.style.strokeDashoffset = "0";
        });
      });
    });
  }

  /* ---------------- Contact form (static — mailto fallback) ---------------- */
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (contactForm && formNote) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formNote.textContent = "Please fill in every field before sending.";
        return;
      }

      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:owais.junodi@example.com?subject=${subject}&body=${body}`;
      formNote.textContent = "Opening your email client…";
    });
  }

  /* ---------------- Back to top ---------------- */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

/* ==========================================================================
   V2 ADDITIONS — loading screen, scroll progress, scrollspy, rotating role,
   stat counters, terminal typer
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Loading screen ---------------- */
  const loader = document.getElementById("loader");
  const loaderStatus = document.getElementById("loaderStatus");
  if (loader) {
    const messages = ["booting systems…", "connecting to AWS…", "syncing identity providers…", "ready."];
    let mi = 0;
    const msgTimer = reduceMotion ? null : setInterval(() => {
      mi = (mi + 1) % messages.length;
      if (loaderStatus) loaderStatus.textContent = messages[mi];
    }, 450);

    const hideLoader = () => {
      if (msgTimer) clearInterval(msgTimer);
      loader.classList.add("is-hidden");
      setTimeout(() => loader.remove(), 700);
    };
    window.addEventListener("load", () => setTimeout(hideLoader, reduceMotion ? 0 : 1400));
    // safety net in case 'load' is delayed
    setTimeout(hideLoader, 4000);
  }

  /* ---------------- Scroll progress bar ---------------- */
  const progressBar = document.getElementById("scrollProgress");
  const updateProgress = () => {
    if (!progressBar) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  };
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------- Scrollspy nav highlighting ---------------- */
  const navLinks = Array.from(document.querySelectorAll(".main-nav a[href^='#']"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------- Rotating hero role ---------------- */
  const roleEl = document.getElementById("roleRotate");
  if (roleEl) {
    const roles = ["AWS Enthusiast", "Linux Administrator", "Identity & Access Admin", "Future DevOps Engineer", "Automation Learner"];
    if (reduceMotion) {
      roleEl.textContent = roles[0];
    } else {
      let idx = 0;
      const swap = () => {
        roleEl.style.opacity = "0";
        setTimeout(() => {
          idx = (idx + 1) % roles.length;
          roleEl.textContent = roles[idx];
          roleEl.style.opacity = "1";
        }, 250);
      };
      roleEl.style.transition = "opacity 0.25s ease";
      setInterval(swap, 2400);
    }
  }

  /* ---------------- Stat counters ---------------- */
  const statNums = document.querySelectorAll(".stat-num");
  const animateStat = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const isDecimal = String(target).includes(".");
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    if (reduceMotion) {
      el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    } else {
      requestAnimationFrame(step);
    }
  };

  if ("IntersectionObserver" in window && statNums.length) {
    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statNums.forEach((el) => statIo.observe(el));
  }

  /* ---------------- Terminal typer (Skills section) ---------------- */
  const terminalBody = document.getElementById("terminalBody");
  if (terminalBody) {
    const lines = [
      { text: "ssh owais@ec2-prod-01", cls: "prompt" },
      { text: "# checking service health before the client's morning shift", cls: "comment" },
      { text: "systemctl status nginx", cls: "prompt" },
      { text: "● nginx.service — active (running)", cls: "" },
      { text: "aws s3 ls s3://covideo-backups/ --recursive | tail -5", cls: "prompt" },
      { text: "# 5 objects found, latest backup 03:12 UTC", cls: "comment" },
      { text: "aws iam list-users --query 'Users[].UserName'", cls: "prompt" },
    ];

    if (reduceMotion) {
      terminalBody.innerHTML = lines
        .map((l) => `<div class="${l.cls}">${l.text}</div>`)
        .join("");
    } else {
      let lineIdx = 0;
      let charIdx = 0;
      let currentLineEl = null;

      const typeNext = () => {
        if (lineIdx >= lines.length) {
          setTimeout(() => {
            terminalBody.innerHTML = "";
            lineIdx = 0;
            charIdx = 0;
            typeNext();
          }, 2600);
          return;
        }
        if (charIdx === 0) {
          currentLineEl = document.createElement("div");
          if (lines[lineIdx].cls) currentLineEl.className = lines[lineIdx].cls;
          terminalBody.appendChild(currentLineEl);
        }
        const full = lines[lineIdx].text;
        charIdx++;
        currentLineEl.textContent = full.slice(0, charIdx);
        if (charIdx >= full.length) {
          lineIdx++;
          charIdx = 0;
          setTimeout(typeNext, 420);
        } else {
          setTimeout(typeNext, 22);
        }
      };
      typeNext();
    }
  }
});

/* ==========================================================================
   ADDITIONS — loader, scroll progress, rotating roles, terminal typing,
   animated stat counters.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Loading screen ---------------- */
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loaderText");
  if (loader) {
    if (loaderText && !reduceMotion) {
      const msg = "booting cloud-ops environment...";
      let i = 0;
      const t = setInterval(() => {
        loaderText.textContent = msg.slice(0, i + 1);
        i++;
        if (i >= msg.length) clearInterval(t);
      }, 28);
    } else if (loaderText) {
      loaderText.textContent = "booting cloud-ops environment...";
    }

    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("is-hidden"), reduceMotion ? 0 : 650);
    });
    // safety fallback in case load already fired
    setTimeout(() => loader.classList.add("is-hidden"), 3500);
  }

  /* ---------------- Scroll progress bar ---------------- */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------------- Rotating hero role ---------------- */
  const roleEl = document.getElementById("roleRotator");
  if (roleEl && !reduceMotion) {
    const roles = [
      "Cloud Support Engineer",
      "AWS Enthusiast",
      "Linux Administrator",
      "Google Workspace Admin",
      "Future DevOps Engineer",
    ];
    let idx = 0;
    setInterval(() => {
      roleEl.classList.add("is-swapping");
      setTimeout(() => {
        idx = (idx + 1) % roles.length;
        roleEl.textContent = roles[idx];
        roleEl.classList.remove("is-swapping");
      }, 350);
    }, 2600);
  }

  /* ---------------- Hero terminal typing loop ---------------- */
  const termEl = document.getElementById("terminalTyped");
  if (termEl) {
    const commands = [
      "whoami --role cloud-support --status growing",
      "aws ec2 describe-instances --region ap-south-1",
      "ssh owais@prod-server-01",
    ];
    if (reduceMotion) {
      termEl.textContent = commands[0];
    } else {
      let cmdIdx = 0;
      const typeCommand = () => {
        const cmd = commands[cmdIdx];
        let charIdx = 0;
        termEl.textContent = "";
        const typer = setInterval(() => {
          termEl.textContent = cmd.slice(0, charIdx + 1);
          charIdx++;
          if (charIdx >= cmd.length) {
            clearInterval(typer);
            setTimeout(() => {
              cmdIdx = (cmdIdx + 1) % commands.length;
              typeCommand();
            }, 1800);
          }
        }, 40);
      };
      typeCommand();
    }
  }

  /* ---------------- Animated stat counters ---------------- */
  const statNumbers = document.querySelectorAll(".stat-number");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const isDecimal = String(el.dataset.count).includes(".");
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };

    if (reduceMotion) {
      el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    } else {
      requestAnimationFrame(step);
    }
  };

  if (statNumbers.length && "IntersectionObserver" in window) {
    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statNumbers.forEach((el) => statIo.observe(el));
  } else {
    statNumbers.forEach((el) => animateCount(el));
  }
});
