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
    // -----------------------------
    // 画像のベースパス
    // 例:
    // wp-content/themes/Think-kids-lab-WP/img/school/札幌校/1.jpg
    // -----------------------------
    const BASE_PATH = "wp-content/themes/Think-kids-lab-WP/img/school";

    // -----------------------------
    // data-code と 都道府県名 の対応表
    // ※ ここのキーは、HTML側の data-code に合わせてください
    // -----------------------------
    const prefectureMap = {
      hokkaido: "北海道",
      tokyo: "東京都",
      shizuoka: "静岡県",
      aichi: "愛知県",
      osaka: "大阪府",
      fukuoka: "福岡県",
    };

    // -----------------------------
    // 校舎データ
    // img は持たせず、
    // folder + imgNum から後で画像パスを組み立てる
    // -----------------------------
    const thinkkids = {
      schools: {
        北海道: [
          {
            name: "札幌校",
            address: "札幌市南区3-3-3",
            folder: "札幌校",
            imgNum: 1,
          },
        ],

        東京都: [
          {
            name: "渋谷校",
            address: "渋谷区1-3-3",
            folder: "渋谷校",
            imgNum: 2,
          },
          {
            name: "新宿校",
            address: "新宿区3-3-3",
            folder: "新宿校",
            imgNum: 1,
          },
        ],

        静岡県: [
          {
            name: "静岡校",
            address: "静岡市葵区2-2-2",
            folder: "静岡校",
            imgNum: 1,
          },
        ],

        愛知県: [
          {
            name: "名古屋校",
            address: "名古屋市中区1-1-1",
            folder: "名古屋校",
            imgNum: 1,
          },
          {
            name: "久屋大通校",
            address: "名古屋市中区2-2-2",
            folder: "久屋大通校",
            imgNum: 1,
          },
          {
            name: "豊田校",
            address: "豊田市西区2-2-2",
            folder: "豊田校",
            imgNum: 2,
          },
        ],

        大阪府: [
          {
            name: "大阪校",
            address: "大阪市北区2-2-2",
            folder: "大阪校",
            imgNum: 1,
          },
          {
            name: "豊中校",
            address: "豊中市西区1-1-2",
            folder: "豊中校",
            imgNum: 1,
          },
        ],

        福岡県: [
          {
            name: "福岡校",
            address: "福岡市博多区2-2-2",
            folder: "福岡校",
            imgNum: 1,
          },
        ],
      },
    };

    // -----------------------------
    // code から都道府県名を取り出す関数
    // もし code がすでに "東京都" ならそのまま返す
    // もし code が "tokyo" なら prefectureMap から "東京都" を返す
    // -----------------------------
    function getPrefectureName(code) {
      // すでに schools のキーとして存在する場合
      if (thinkkids.schools[code]) {
        return code;
      }

      // data-code から都道府県名へ変換できる場合
      if (prefectureMap[code]) {
        return prefectureMap[code];
      }

      // どちらでもなければ null
      return null;
    }

    // -----------------------------
    // folder と imgNum から画像URLを作る関数
    // 画像拡張子が png の場合は .png に変えてください
    // -----------------------------
    function getSchoolImagePath(school) {
      return `${BASE_PATH}/${school.folder}/${school.imgNum}.jpg`;
    }

    // -----------------------------
    // 校舎一覧を描画する関数
    // -----------------------------
    function renderSchools(code) {
      // code を都道府県名に変換
      const prefectureName = getPrefectureName(code);

      // 該当する都道府県が見つからなければ準備中表示
      if (!prefectureName) {
        return "<p>現在準備中です</p>";
      }

      // 都道府県に属する校舎一覧を取得
      const schools = thinkkids.schools[prefectureName];

      // 校舎一覧が空なら準備中表示
      if (!schools || schools.length === 0) {
        return "<p>現在準備中です</p>";
      }

      // HTML文字列を作る
      return schools
        .map((school) => {
          // ここで画像パスを組み立てる
          const imgPath = getSchoolImagePath(school);

          return `
          <div class="school-card">
            <img src="${imgPath}" alt="${school.name}">
            <div class="school-card__body">
              <p class="school-card__title">${school.name}</p>
              <p>${school.address}</p>
            </div>
          </div>
        `;
        })
        .join("");
    }

    // -----------------------------
    // クリックイベント
    // -----------------------------
    $("[data-code]").on("click", function () {
      // クリックされた要素の data-code を取得
      const code = $(this).data("code");

      // code から都道府県名を取得
      const prefectureName = getPrefectureName(code);

      // 見つからなければ表示だけ更新して終了
      if (!prefectureName) {
        $(".js-result").text("現在準備中です");
        fadeHtml($(".js-school-list"), "<p>現在準備中です</p>");
        return;
      }

      // タイトル更新
      $(".js-result").text(`${prefectureName} の教室一覧`);

      // active状態をいったん全部外す
      $("[data-code]").removeClass("active is-active");

      // map側(path)の active 付与
      $(`path[data-code="${code}"]`).addClass("is-active");

      // button側の active 付与
      $(`button[data-code="${code}"]`).addClass("active");

      // 一覧を差し替え
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
