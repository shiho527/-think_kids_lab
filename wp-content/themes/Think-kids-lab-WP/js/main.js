(function ($) {
  $(function () {
    // =============================
    // 共通ユーティリティ
    // =============================
    function fadeHtml($el, html, fadeOutSpeed = 150, fadeInSpeed = 300) {
      $el.fadeOut(fadeOutSpeed, function () {
        $(this).html(html).fadeIn(fadeInSpeed);
      });
    }

    function smoothScroll(selector, duration = 1200) {
      $(selector).on("click", function () {
        const href = $(this).attr("href");
        const target = $(href === "#" || href === "" ? "html" : href);
        if (!target.length) return;
        $("html,body").animate(
          { scrollTop: target.offset().top },
          duration,
          "swing",
        );
        return false;
      });
    }

    // =============================
    // ハンバーガー
    // =============================
    $(".hamburger").on("click", () => $("header").toggleClass("open"));
    $("#mask, #nav a").on("click", () => $("header").removeClass("open"));

    // =============================
    // セクションタイトル split
    // =============================
    $(".js-split").each(function () {
      $(this).html(
        $(this)
          .text()
          .split("")
          .map((char) => `<span>${char}</span>`)
          .join(""),
      );
    });

    function animateSplit() {
      $(".js-split").each(function () {
        const elemPos = $(this).offset().top;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (
          scroll > elemPos - windowHeight + 100 &&
          !$(this).hasClass("show")
        ) {
          $(this).addClass("show");

          $(this)
            .find("span")
            .each((i, el) => $(el).css("animation-delay", i * 0.05 + "s"));
        }
      });
    }
    $(window).on("scroll load", animateSplit);

    // =============================
    // ギア回転
    // =============================
    function gearRotation(wrapper, leftGear, rightGear, speedRight, speedLeft) {
      const $wrapper = $(wrapper);
      if (!$wrapper.length) return;

      const $left = $(leftGear);
      const $right = $(rightGear);
      const baseRotation = 80;

      $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const wrapperTop = $wrapper.offset().top;
        const wrapperHeight = $wrapper.outerHeight();
        const windowHeight = $(window).height();

        if (
          scrollTop + windowHeight < wrapperTop ||
          scrollTop > wrapperTop + wrapperHeight
        )
          return;

        const scrollInside = scrollTop - wrapperTop;

        $left.css(
          "transform",
          `translate(-50%, -50%) rotate(${baseRotation - scrollInside * speedLeft}deg) scaleX(-1)`,
        );

        $right.css(
          "transform",
          `translate(-50%, -50%) rotate(${baseRotation + scrollInside * speedRight}deg)`,
        );
      });
    }

    gearRotation(".about", ".gear-left", ".gear-right", 0.2, 0.15);
    gearRotation(
      ".about-page",
      ".about-page__gear--left",
      ".about-page__gear--right",
      0.2,
      0.15,
    );
    gearRotation(".bg-wrapper", ".bg-gear-left", ".bg-gear-right", 0.15, 0.15);

    // =============================
    // FAQ
    // =============================
    $(".faq-q").on("click", function () {
      $(this).next(".faq-a").slideToggle();
      $(this).toggleClass("open");
    });

    // =============================
    // to-top
    // =============================
    const $toTop = $(".to-top");
    if ($toTop.length) {
      $toTop.hide();

      $(window).on("scroll", () =>
        $(window).scrollTop() > 700 ? $toTop.fadeIn() : $toTop.fadeOut(),
      );

      $toTop.on("click", () => $("html,body").animate({ scrollTop: 0 }, 500));
    }

    // =============================
    // voice スライダー
    // =============================
    function setEqualHeight() {
      let maxHeight = 0;

      $(".voice-card").css("height", "auto");

      $(".slick-active .voice-card").each((i, el) => {
        maxHeight = Math.max(maxHeight, $(el).outerHeight());
      });

      $(".slick-active .voice-card").css("height", maxHeight + "px");
    }

    if ($(".voice-cards").length && $.fn.slick) {
      $(".voice-cards")
        .on("init reInit afterChange", setEqualHeight)
        .slick({
          arrows: true,
          dots: true,
          centerMode: true,
          centerPadding: "10%",
          slidesToShow: 3,
          autoplay: true,
          autoplaySpeed: 3000,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1, centerPadding: "30px" },
            },
          ],
        });

      $(window).on("resize", setEqualHeight);
    }

    // =============================
    // スムーススクロール
    // =============================
    smoothScroll('a[href^="#"]');

    // =============================
    // フォーム切替
    // =============================
    $('input[name="formType"]').on("change", function () {
      $(".trial-form").toggle($(this).val() === "trial");
      $(".contact-form").toggle($(this).val() !== "trial");
    });

    // =============================
    // 教室検索（WPデータ版）
    // =============================

    function renderSchools(code) {
      const schools = thinkkids.schools[code];
      if (!schools) return "<p>現在準備中です</p>";

      return schools
        .map(
          (school) => `
        <div class="school-card">
          <img src="${school.img}" alt="">
          <div class="school-card__body">
            <p class="school-card__title">${school.name}</p>
            <p>${school.address}</p>
          </div>
        </div>
      `,
        )
        .join("");
    }

    $("[data-code]").on("click", function () {
      const code = $(this).data("code");

      $(".js-result").text(`${thinkkids.prefecture[code]} の教室一覧`);

      $("[data-code]").removeClass("active is-active");
      $(`path[data-code="${code}"]`).addClass("is-active");
      $(`button[data-code="${code}"]`).addClass("active");

      fadeHtml($(".js-school-list"), renderSchools(code));
    });
  });

  // =============================
  // flatpickr
  // =============================
  function initDatePicker() {
    if (typeof flatpickr === "undefined") return;

    flatpickr(".datepicker", {
      dateFormat: "Y-m-d",
      enable: [
        function (date) {
          return date.getDay() === 1 || date.getDay() === 4;
        },
      ],
    });
  }

  // =============================
  // フォーム切替 + 無効化
  // =============================
  function initFormToggle() {
    const $radio = $('input[name="formType"]');
    if (!$radio.length) return;

    function toggleForm() {
      const isTrial = $('input[name="formType"]:checked').val() === "trial";

      $(".trial-form").toggle(isTrial);
      $(".contact-form").toggle(!isTrial);

      $(".trial-form :input").prop("disabled", !isTrial);
      $(".contact-form :input").prop("disabled", isTrial);
    }

    $radio.on("change", toggleForm);
    toggleForm();
  }

  // =============================
  // 初期化
  // =============================
  jQuery(document).ready(function () {
    initDatePicker();
    initFormToggle();
  });

  // =============================
  // CF7再描画対応
  // =============================
  document.addEventListener("wpcf7render", function () {
    initDatePicker();
    initFormToggle();
  });
})(jQuery);
