from pathlib import Path

# Create a more robust standalone JS file that works when loaded by index.html.
js = r'''(() => {
  "use strict";

  function init() {
    const input = document.getElementById("messageInput");
    const printBtn = document.getElementById("printBtn");
    const clearBtn = document.getElementById("clearBtn");
    const receiptArea = document.getElementById("receiptArea");
    const receiptMessage = document.getElementById("receiptMessage");
    const receiptDate = document.getElementById("receiptDate");
    const statusText = document.getElementById("statusText");
    const statusLight = document.getElementById("statusLight");
    const counter = document.getElementById("counter");

    if (!input || !printBtn || !clearBtn || !receiptArea ||
        !receiptMessage || !receiptDate || !statusText ||
        !statusLight || !counter) {
      console.error("Retro Receipt Printer: ไม่พบ HTML element ที่จำเป็น");
      return;
    }

    function updateCounter() {
      counter.textContent = `${input.value.length} / 280`;
    }

    function getDateTime() {
      return new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date());
    }

    function printReceipt() {
      const text = input.value.trim() || "ไม่มีข้อความ";

      receiptArea.classList.remove("show");
      statusText.textContent = "PRINTING...";
      statusLight.classList.add("active");
      printBtn.disabled = true;

      window.setTimeout(() => {
        receiptMessage.textContent = text;
        receiptDate.textContent = getDateTime();
        receiptArea.classList.add("show");
      }, 180);

      window.setTimeout(() => {
        statusText.textContent = "PRINT COMPLETE";
        statusLight.classList.remove("active");
        printBtn.disabled = false;
      }, 1250);
    }

    input.addEventListener("input", updateCounter);

    input.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        printReceipt();
      }
    });

    printBtn.addEventListener("click", printReceipt);

    clearBtn.addEventListener("click", () => {
      input.value = "";
      receiptArea.classList.remove("show");
      statusText.textContent = "READY TO PRINT";
      statusLight.classList.remove("active");
      updateCounter();
      input.focus();
    });

    updateCounter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
'''

path = Path("/mnt/data/retro-receipt-printer-ready/script.js")
path.write_text(js, encoding="utf-8")
print(f"แก้ไข JS ให้แล้ว: {path}")
