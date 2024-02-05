document.addEventListener("DOMContentLoaded", function () {
  // 汉堡菜单逻辑
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const fullscreenMenu = document.getElementById("fullscreen-menu");
  const menuItems = fullscreenMenu.querySelectorAll("nav a");

  hamburgerMenu.addEventListener("click", function () {
    fullscreenMenu.classList.toggle("show");
    hamburgerMenu.classList.toggle("hamburger-active");
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      fullscreenMenu.classList.remove("show");
      hamburgerMenu.classList.remove("hamburger-active");
    });
  });

  // 页面滚动事件
  window.addEventListener("scroll", function () {
    var headerContainer = document.querySelector(".header-container");
    if (window.pageYOffset > 50) {
      headerContainer.classList.add("scrolled");
    } else {
      headerContainer.classList.remove("scrolled");
    }
  });

  // 轮播图
  let slideIndex = 0;
  showSlides(slideIndex);

  function showSlides(n) {
    let i;
    let slides = document
      .getElementsByClassName("carousel-images")[0]
      .getElementsByTagName("img");
    if (n + 2 >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 3;

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("active");
    }

    slides[slideIndex].style.display = "block";
    slides[slideIndex + 1].style.display = "block";
    slides[slideIndex + 2].style.display = "block";

    slides[slideIndex + 1].classList.add("active");
  }

  window.moveSlide = function (n) {
    showSlides((slideIndex += n));
  };

  // iPhone轮播
  const carouselContainers = document.querySelectorAll(".carousel-container");

  carouselContainers.forEach((container) => {
    const prevBtn = container.querySelector(".prevBtn");
    const nextBtn = container.querySelector(".nextBtn");
    const imageBoxes = Array.from(
      container.querySelectorAll(".custom-image-box")
    );

    let activeIndex = 1;
    updateImages();

    prevBtn.addEventListener("click", () => shiftImages("prev"));
    nextBtn.addEventListener("click", () => shiftImages("next"));

    function shiftImages(direction) {
      if (direction === "next") {
        activeIndex = (activeIndex + 1) % imageBoxes.length;
      } else {
        activeIndex = (activeIndex - 1 + imageBoxes.length) % imageBoxes.length;
      }
      updateImages();
    }

    function updateImages() {
      imageBoxes.forEach((box, index) => {
        box.classList.remove("active");
        if (index === activeIndex) {
          box.classList.add("active");
        }
      });
    }
  });

  // 购买按钮逻辑
  const buyButtons = document.querySelectorAll(".buy-button");

  buyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const flowerId = this.getAttribute("data-flower-id");
      window.location.href = `buy.html?id=${flowerId}`;
    });
  });

  // 弹出窗口逻辑
  document.querySelectorAll(".black-box").forEach((item) => {
    item.addEventListener("click", function () {
      document.getElementById("popup").style.display = "block";
    });
  });

  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });
});
// 预约
document
  .getElementById("appointment-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });

// 加载动画
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loading-animation");
  setTimeout(() => {
    loader.classList.add("fade-out");
    loader.addEventListener("animationend", () => {
      loader.style.display = "none";
    });
  }, 3000);
});
// 渐出
document.addEventListener("DOMContentLoaded", function () {
  // 假设你的元素已经有了自己的类名，这里我们使用`.main-section`作为示例
  const sections = document.querySelectorAll(".main-section");

  const revealSections = () => {
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      // 元素距离视口顶部的距离
      const revealTop = section.getBoundingClientRect().top;
      // 元素显示的触发点（视口的一部分）
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      } else {
        // 如果你不想在元素再次离开视口时隐藏它们，这行可以移除
        section.style.opacity = 0;
        section.style.transform = "translateY(20px)";
      }
    });
  };

  window.addEventListener("scroll", revealSections);
  revealSections(); // 确保在页面加载时就检查一次
});
// 打字机
document.addEventListener("DOMContentLoaded", function () {
  const typewriterText = document.getElementById("typewriter-text");
  const image = document.querySelector(".decorative-image"); // 获取图片元素
  let typed = false;

  function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function typeWriter(element, text, index = 0, onComplete) {
    if (index < text.length) {
      if (text.charAt(index) === "<") {
        let tagCloseIndex = text.indexOf(">", index);
        element.innerHTML += text.substring(index, tagCloseIndex + 1);
        index = tagCloseIndex;
      } else {
        element.innerHTML += text.charAt(index);
      }
      setTimeout(() => typeWriter(element, text, index + 1, onComplete), 50);
    } else if (onComplete) {
      onComplete();
    }
  }

  window.addEventListener("scroll", () => {
    if (!typed && isElementInView(typewriterText)) {
      const text = typewriterText.getAttribute("data-text");
      typewriterText.innerHTML = "";
      typeWriter(typewriterText, text, 0, () => {
        // 打字机效果完成后渐变显示图片
        image.style.opacity = 1; // 逐渐显示图片
      });
      typed = true;
    }
  });
});
// 动画
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  ); // 调整threshold值以优化触发时机

  const elements = document.querySelectorAll(
    ".row.main-section .left-text, .row.main-section .right-text, .row.main-section .left-image, .row.main-section .right-image"
  );
  elements.forEach((el) => {
    observer.observe(el);
  });
});

// p显示
document.addEventListener("DOMContentLoaded", function () {
  // 为每个触发器添加点击事件
  document.querySelectorAll(".parent").forEach((parent, index) => {
    parent.addEventListener("click", function () {
      // 根据点击的元素设置不同的内容和字体样式
      let contentText = "";
      let fontStyleClass = "";
      switch (index) {
        case 0:
          contentText =
            "登录页面のデザインは、花の形をヒントにしています。<br>シンプルかつ実用的をモットーに、使いやすさと視覚的魅力を兼ね備えたインターフェースを目指しています。";
          fontStyleClass = "font-style-1";
          break;
        case 1:
          contentText =
            "この花屋に連携したアプリは、花の種類をスキャンして識別することができ、花の世話の仕方や花に関する豊富な知識を提供します。<br>また、個人のホームページにはカレンダーアシスタントがあり、花の育て方のプロセスを記録するのに役立ちます。";
          fontStyleClass = "font-style-2";
          break;
        case 2:
          contentText = "オーダーページの紹介文...";
          fontStyleClass = "font-style-3";
          break;
      }
      // 显示弹出窗口并设置内容和字体
      const popup = document.getElementById("popup");
      popup.style.display = "block";
      const popupContent = popup.querySelector(".popup-content p");
      popupContent.innerHTML = contentText;
      // 清除之前可能添加的任何字体样式类
      popupContent.classList.remove(
        "font-style-1",
        "font-style-2",
        "font-style-3"
      );
      // 添加当前字体样式类
      popupContent.classList.add(fontStyleClass);
    });
  });

  // 关闭按钮的逻辑
  document
    .querySelector(".popup .close")
    .addEventListener("click", function () {
      document.getElementById("popup").style.display = "none";
    });
});
