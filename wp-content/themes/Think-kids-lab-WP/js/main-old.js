// =============================
// ハンバーガーメニュー
// =============================
//

$(function () {
  $(".hamburger").on("click", function () {
    $("header").toggleClass("open");
  });

  $("#mask").on("click", function () {
    $("header").removeClass("open");
  });

  $("#nav a").on("click", function () {
    $("header").removeClass("open");
  });
});

// =============================
// セクションタイトル
// =============================
//
$(".js-split").each(function () {
  let text = $(this).text();
  let splitText = text.split("");
  let html = "";

  splitText.forEach(function (char) {
    html += "<span>" + char + "</span>";
  });

  $(this).html(html);
});

$(window).on("scroll load", function () {
  $(".js-split").each(function () {
    let elemPos = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 100) {
      if (!$(this).hasClass("show")) {
        $(this).addClass("show");

        $(this)
          .find("span")
          .each(function (i) {
            $(this).css("animation-delay", i * 0.05 + "s");
          });
      }
    }
  });
});

// =============================
// about ギア回転（完全防御）
// =============================

$(function () {
  const $about = $(".about");
  if ($about.length === 0) return;

  const $gearLeft = $(".gear-left");
  const $gearRight = $(".gear-right");

  let baseRotation = 80;

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const aboutTop = $about.offset().top;
    const aboutHeight = $about.outerHeight();
    const windowHeight = $(window).height();

    const isInView =
      scrollTop + windowHeight > aboutTop && scrollTop < aboutTop + aboutHeight;

    if (!isInView) return;

    const scrollInside = scrollTop - aboutTop;

    const rotationRight = baseRotation + scrollInside * 0.2;
    const rotationLeft = baseRotation - scrollInside * 0.15;

    $gearLeft.css(
      "transform",
      `translate(-50%, -50%) rotate(${rotationLeft}deg) scaleX(-1)`,
    );

    $gearRight.css(
      "transform",
      `translate(-50%, -50%) rotate(${rotationRight}deg)`,
    );
  });
});

// =============================
// about-page ギア回転（完全防御）
// =============================

$(function () {
  const $aboutPage = $(".about-page");
  if ($aboutPage.length === 0) return;

  const $gearLeft = $(".about-page__gear--left");
  const $gearRight = $(".about-page__gear--right");

  let baseRotation = 80;

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const aboutTop = $aboutPage.offset().top;
    const aboutHeight = $aboutPage.outerHeight();
    const windowHeight = $(window).height();

    const isInView =
      scrollTop + windowHeight > aboutTop && scrollTop < aboutTop + aboutHeight;

    if (!isInView) return;

    const scrollInside = scrollTop - aboutTop;

    const rotationRight = baseRotation + scrollInside * 0.2;
    const rotationLeft = baseRotation - scrollInside * 0.15;

    $gearLeft.css(
      "transform",
      `translate(-50%, -50%) rotate(${rotationLeft}deg) scaleX(-1)`,
    );

    $gearRight.css(
      "transform",
      `translate(-50%, -50%) rotate(${rotationRight}deg)`,
    );
  });
});

// =============================
// bg-wrapper ギア回転（完全防御）
// =============================

$(function () {
  const $bgWrapper = $(".bg-wrapper");
  if ($bgWrapper.length === 0) return;

  const $bgLeft = $(".bg-gear-left");
  const $bgRight = $(".bg-gear-right");

  let bgBaseRotation = 80;

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const wrapperTop = $bgWrapper.offset().top;
    const wrapperHeight = $bgWrapper.outerHeight();
    const windowHeight = $(window).height();

    const isInView =
      scrollTop + windowHeight > wrapperTop &&
      scrollTop < wrapperTop + wrapperHeight;

    if (!isInView) return;

    const scrollInside = scrollTop - wrapperTop;

    const rotationRight = bgBaseRotation + scrollInside * 0.15;
    const rotationLeft = bgBaseRotation - scrollInside * 0.15;

    $bgLeft.css(
      "transform",
      `translate(-50%, -50%) rotate(${rotationLeft}deg) scaleX(-1)`,
    );

    $bgRight.css(
      "transform",
      `translate(-50%, -50%) rotate(${rotationRight}deg)`,
    );
  });
});

// =============================s
// map 教室切り替え
// =============================
//

$(function () {
  const prefectureJP = [
    "",
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

  const schoolData = {
    1: [{ name: "札幌校", address: "札幌市南区3-3-3", img: "img/school1.jpg" }],
    23: [
      {
        name: "名古屋校",
        address: "名古屋市中区1-1-1",
        img: "img/school1.jpg",
      },
      {
        name: "久屋大通校",
        address: "名古屋市中区2-2-2",
        img: "img/school2.jpg",
      },
      {
        name: "豊田校",
        address: "豊田市西区2-2-2",
        img: "img/school2.jpg",
      },
    ],
    13: [
      { name: "新宿校", address: "新宿区3-3-3", img: "img/school3.jpg" },
      { name: "渋谷校", address: "渋谷区1-3-3", img: "img/school2.jpg" },
    ],
    27: [
      { name: "大阪校", address: "大阪市北区2-2-2", img: "img/school1.jpg" },
      { name: "豊中校", address: "豊中市西区1-1-2", img: "img/school3.jpg" },
    ],
    40: [
      { name: "福岡校", address: "福岡市博多区2-2-2", img: "img/school1.jpg" },
    ],
    22: [
      { name: "静岡校", address: "静岡市葵区2-2-2", img: "img/school2.jpg" },
    ],
  };

  // ★ 地図・外側テキストすべて統一
  $("[data-code]").on("click", function () {
    const code = $(this).data("code");
    const name = prefectureJP[code];

    // タイトル変更
    $(".js-result").text(name + " の教室一覧");

    // アクティブ制御
    $("[data-code]").removeClass("active is-active");
    $(`path[data-code="${code}"]`).addClass("is-active");
    $(`button[data-code="${code}"]`).addClass("active");

    // データ取得
    const schools = schoolData[code];
    let html = "";

    if (schools) {
      schools.forEach(function (school) {
        html += `
          <div class="school-card">
            <img src="${school.img}" alt="">
            <div class="school-card__body">
              <p class="school-card__title">${school.name}</p>
              <p>${school.address}</p>
            </div>
          </div>
        `;
      });
    } else {
      html = "<p>現在準備中です</p>";
    }

    // フェード切り替え
    $(".js-school-list").fadeOut(150, function () {
      $(this).html(html).fadeIn(300);
    });
  });
});

// =============================
// 教室一覧ページ
// =============================

$(function () {
  let html = "";

  $.each(schoolData, function (code, schools) {
    const prefecture = prefectureJP[code];

    html += `
      <div class="school-area">

        <h3 class="school-area__title">
          ${prefecture}
        </h3>

        <div class="school-area__grid">
    `;

    $.each(schools, function (i, school) {
      html += `
        <div class="school-card">

          <img src="${school.img}" alt="">

          <p class="school-card__name">
            ${school.name}
          </p>

          <p class="school-card__address">
            ${school.address}
          </p>

        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  $(".js-school-area").html(html);
});

// =============================
// voice スライダー
// =============================
//

$(function () {
  function setEqualHeight() {
    var maxHeight = 0;

    $(".voice-card").css("height", "auto");

    $(".slick-active .voice-card").each(function () {
      var h = $(this).outerHeight();
      if (h > maxHeight) {
        maxHeight = h;
      }
    });

    $(".slick-active .voice-card").css("height", maxHeight + "px");
  }

  $(".voice-cards")
    .on("init reInit afterChange", function () {
      setEqualHeight();
    })
    .slick({
      arrows: true,
      dots: true,
      centerMode: true,
      centerPadding: "10%",
      slidesToShow: 3,
      autoplay: false,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "30px",
          },
        },
      ],
    });

  $(window).on("resize", function () {
    setEqualHeight();
  });
});

// =============================
// FAQ アコーディオン
// =============================
//

$(function () {
  $(".faq-q").on("click", function () {
    $(this).next(".faq-a").slideToggle();
    $(this).toggleClass("open");
  });
});

// =============================
// to-top ボタン（安全版）
// =============================

$(function () {
  const pagetop = $(".to-top");
  if (pagetop.length === 0) return;

  pagetop.hide();

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 700) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });

  pagetop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

// =============================
// スムーススクロール（完全防御）
// =============================

$(function () {
  $('a[href^="#"]').on("click", function () {
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);

    if (target.length === 0) return;

    const position = target.offset().top;

    $("html, body").animate({ scrollTop: position }, 1200, "swing");

    return false;
  });
});

// =============================
// contact/trial フォーム切り替え
// =============================
//

$(function () {
  $('input[name="formType"]').change(function () {
    if ($(this).val() === "trial") {
      $(".trial-form").fadeIn();
      $(".contact-form").hide();
    } else {
      $(".trial-form").hide();
      $(".contact-form").fadeIn();
    }
  });
});

// =============================
// contact 日程選択
// =============================
//

$(function () {
  const selects = $(".trialDate");
  const today = new Date();
  const daysToShow = 15;

  for (let i = 0; i < daysToShow; i++) {
    let date = new Date();
    date.setDate(today.getDate() + i);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    const baseKey = year + "-" + formattedMonth + "-" + formattedDay;

    addOption(date, baseKey, "10:00");
    addOption(date, baseKey, "16:00");
  }

  function addOption(date, baseKey, timeLabel) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const text = month + "月" + day + "日 " + timeLabel;
    const value = baseKey + "-" + timeLabel;

    selects.each(function () {
      $(this).append(`<option value="${value}">${text}</option>`);
    });
  }
});
