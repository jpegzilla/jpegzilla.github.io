// the character log messages were a debugging thing I was using
// just let me be a weeb in peace and stop snooping in my code

// but if you wanna look, then enjoy this weird mix of ES6, vanilla javascript,
// jquery, and lodash I created while on a mission to learn javascript.

let hatsune = `%cWindow Loaded.
　　　　　　　　　　　　　　　　　　　　 ,....
　　　　　　　　　　　　　　　 __.......＿/;-､\`ヽ､
　 　 　 　 ＿＿.......='´￣￣　　　　 \`ヽ､ \`>::/
　　　　　 i:;-ｧ‐‐=. i:|　 　 ,.-‐､　 ヘ.,.‐-\`､:∧
　　　　　 y'´　 　 | |:|　／　　　　　　　 　 \`ヽ!.
　　 　 ／ 　 　 　 |_|:|/　　 ／　i　　 i　　 ヽ.　ヽ
.　　／　　　　 　 /-ｧ'　　./　i　 l i　 |ヽ　　 ヽ　|
　, '　　　　　　　/　/' 　 / ./.|. ,ﾊ |　 | .>､　　|　|
/　　　　　　　 / 　 '| 　 | /ヽ|/.　l.l　 l/ti.i､　 l　|
　　　　 　 　 .∧ /\`l 　 ||'FｦTヾ\`.l|| /f\'ﾉ | }. ,\'　.l
　　　　　 　 /　 ヾ_|　　| _ﾋ::ﾉ　 　 l/ \`\'\' .lｲ./　/
　　　　　　/　　　　|　. | \`‐\'￣　　　 \'　 ﾉ/ｲ ./|
　　　　　 /　　　　 ﾍ. l |ヽ､　　　 ,.. , ィ´　 |/　.|
　　　 　 /　　　　,,ﾍ\´ヾ.|ヽ､ \`ゝ-､.ヘヽ　　　　│
　 　 　 /　　　／ ヾ,>､ヾ.　￣ﾊ､__>│} 　 　 　 |
　　 　 /　　.／ヽ､　ヾ,>､_,...-|\`\´| |　 |.|- ､ 　 　 |
　　　 ,'　　/ 　 　 ヽ　 \`'i\´　/\`‐ﾍL..､|」.- l　　　 |
　　　,'　　 !　　　　 .l　　 |_/_「ヾ､=ﾐヽヽ /-.､　　 | this website belongs to me, just like \n                                                             everything else in the world >:3
`;

let popura = `%cDocument Ready.
　 　　　　　／⌒､
　　　　　／:::::::::::::.
　　　　.::::::::::,. :'´^⌒｀ヽ
　　 　i:::::::::/:::::::::::::::::::::::ヽ
　　 　t.:::::::{:::::从ﾘ从ﾙﾊﾄ)
　　　　   }:::::ﾐ又 ┃ 　┃,'
  　　 　八::::ｿﾍ､）   U _ノ ）
　　　　　)ﾘ／}｀/￣￣￣￣/
　　　　　(_:::つ/＿＿＿＿/　ｶﾀｶﾀ hello! my name is Taneshima Popura!\n
                                    I\'m just here to help with the website. don\'t mind me!
`;

window.mobilecheck = () => {
  let check = false;
  (a => {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

if (mobilecheck()) {
  disableScroll();
}

let units = {};

let currYear = new Date().getFullYear();
let currYearString =
  currYear.toString() == "2019" ? "2019" : "2019 - " + currYear;

let json = "./json/messages.json";

var keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disableScroll() {
  if (window.addEventListener)
    // older FF
    window.addEventListener("DOMMouseScroll", preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

// scrolltimer is to prevent excessively rapid class switching
var scrollTimer = false;
let progwidth, mouseClick;

$(window).on("load", function() {
  console.log(hatsune, "@charset=UTF-8;font-family:MS PGothic;font-size:12px;");
});

$(document).ready(function() {
  console.log(popura, "@charset=UTF-8;font-family:MS PGothic;font-size:12px;");
  // shit actually begins here
  $(".copyright").text(currYearString);

  $(document).on("mousemove", event => {
    $(".c").css({
      left: event.clientX,
      top: event.clientY
    });
  });

  setTimeout(function() {
    $(".center").addClass("loaded");
    setTimeout(function() {
      $("section").removeClass("notloaded");
      setTimeout(function() {
        $(".slider-int").addClass("active");
        setTimeout(function() {
          $(".sidebar-right").removeClass("inactive");
          setTimeout(function() {
            scrollTimer = true;
          }, 500);
        }, 5000);
      }, 1000);
    }, 1000);
  }, 2000);

  var mx, my, dist;

  function calcDist(elem, msx, msy) {
    return Math.floor(
      Math.sqrt(
        Math.pow(msx - (elem.offset().left + elem.width() / 2), 2) +
          Math.pow(msy - (elem.offset().top + elem.height() / 2), 2)
      )
    );
  }

  window.onblur = function(e) {
    document.title = "hey come back";
  };

  window.onfocus = function(e) {
    document.title = "jpegzilla | web creator";
  };

  $(document)
    .mousedown(function(e) {
      if (e.button === 0) {
        mouseClick = 1;
        // things to do while the left mouse button is held down
        $(".c").css({
          transform: "scale(0.5)"
        });
      }
    })
    .mouseup(function(e) {
      if (e.button === 0) {
        mouseClick = 0;
        // things to do when the left mouse button is released
        $(".c").css({
          transform: "scale(1)"
        });
      }
    });
  const titleArray = [
    "a web designer.",
    "a digital artist.",
    "a web developer.",
    "a creative.",
    "always online.",
    "no one, really."
  ];
  let index = 0;

  const changeTitle = () => {
    index += 1;
    if (index === titleArray.length) {
      index = 0;
    }
    $(".my-title").text(titleArray[index]);
  };
  setTimeout(function() {
    setInterval(changeTitle, 4000);
  }, 5000);

  $(".my-title").on("click", () => {
    changeTitle();
  });

  $(".my-name")
    .mousedown(function(e) {
      if (e.button === 0) {
        $(".section-1-background p").addClass("active");
        $(".my-name").addClass("outline");
      }
    })
    .mouseup(function(e) {
      if (e.button === 0) {
        $(".section-1-background p").removeClass("active");
        $(".my-name").removeClass("outline");
      }
    })
    .mouseout(function(e) {
      if (e.button === 0) {
        $(".section-1-background p").removeClass("active");
        $(".my-name").removeClass("outline");
      }
    });

  $(document).on("mousedown", e => {
    mx = e.pageX;
    my = e.pageY;
    let ripple = $(".ripple");
    let rippleClone = ripple
      .clone()
      .css({
        left: mx,
        top: my
      })
      .appendTo($(".clickhandler"));
    let rca = [];
    rca.push(rippleClone);
    if (rca[0].length >= 5) {
      rippleClone.remove();
    }
    setTimeout(function() {
      rippleClone.remove();
    }, 500);
  });

  // define and initialize all experimental text shit here
  var vh, vw, vmin, oneVMin;

  const calculateUnits = () => {
    vh = window.innerHeight;
    vw = window.innerWidth;
    if (vh > vw) {
      vmin = vw;
    } else {
      vmin = vh;
    }
    oneVMin = vmin / 100;
    units.vmin = oneVMin;
    units.windowVW = vw;
    units.windowVH = vh;
  };

  calculateUnits();
  $(window).on("resize", e => {
    calculateUnits();
  });

  // experimental text effects end here... or do they?
  $(document)
    .mouseenter(function(e) {
      // on entering document
      $(".c").css({
        transform: "scale(1)"
      });
      $(".cursor").css({
        transform: "scale(1)",
        transition: "transform 0.5s"
      });
    })
    .mouseleave(function(e) {
      // on leaving document
      $(".c").css({
        transform: "scale(0)"
      });
      $(".cursor").css({
        transform: "scale(0)",
        transition: "transform 0.5s"
      });
    });

  // click chat icon
  $(".chat").on("click", e => {
    $(".chat").toggleClass("active");
    $(".chat-menu-container").toggleClass("active");
  });

  $(".about").on("click", e => {
    $(".section-1, .section-2").removeClass("destroy");
    closeMenu();
    $(".section-3").removeClass("active");
    setTimeout(function() {
      $(".section-1, .section-2").removeClass("notloaded");
    }, 500);
    if ($(".section-2").hasClass("active") == false) {
      navigationManager(2);
      $(".works").removeClass("sth");
      $(".about").addClass("sth");
    }
  });

  $(".contact").on("click", e => {
    $(".section-1, .section-2").addClass("notloaded");
    closeMenu();
    $(".section-3").addClass("active");
    setTimeout(function() {
      $("header").removeClass("invert");
      $(".section-1, .section-2").addClass("destroy");
    }, 1500);
  });

  $(".contact-close").on("click", e => {
    $(".section-1, .section-2").removeClass("destroy");
    closeMenu();
    $(".section-3").removeClass("active");
    setTimeout(function() {
      if ($(".section-2").hasClass("active")) {
        $("header").addClass("invert");
      }
      $(".section-1, .section-2").removeClass("notloaded");
    }, 500);
  });

  $(".contact-link").on("click", e => {
    $(".con-links").addClass("active");
    setTimeout(function() {
      $(".con-links").removeClass("active");
    }, 1000);
  });

  function handleViewButton(btn) {
    switch (btn) {
      case "sl-ruler":
        break;

      case "bekin":
        break;
    }
  }

  $(
    ".menuitem, .chat, .menu-button, a, .view-button, .close-button, .work-title"
  ).on({
    mouseenter: function() {
      $(".cursor circle").css({
        r: "43.75",
        transition: "0.3s"
      });
    },
    mouseleave: function() {
      $(".cursor circle").css({
        r: "25",
        transition: "0.3s"
      });
    }
  });

  $(".view-button, .view-button").on({
    mouseenter: function() {
      $(".whiteout").addClass("peek");
    },
    mouseleave: function() {
      $(".whiteout").removeClass("peek");
    },
    click: function(e) {
      if ($(this).is(".bekin, .sl-ruler, .markzilla")) {
        if (!$(".about-container").hasClass("fadeout")) {
          $(".about-container").addClass("fadeout");
        }
        $(".whiteout").removeClass("peek");
        setTimeout(function() {
          $(".whiteout").addClass("active");
        }, 300);
      }

      let btn = this.classList[1];
      handleViewButton(btn);
    }
  });

  function handleViewButton(btn) {
    switch (btn) {
      case "sl-ruler":
        $(".whiteout-content").animate(
          {
            scrollTop: $(".content-saltlines").offset().top
          },
          300
        );
        break;
      case "bekin":
        $(".whiteout-content").animate(
          {
            scrollTop: $(".content-bekin").offset().top
          },
          300
        );
        break;
      case "markzilla":
        $(".whiteout-content").animate(
          {
            scrollTop: $(".content-markzilla").offset().top
          },
          300
        );
        break;
      case "experiments":
        console.log("go to experiments");
        break;
      case "blog":
        console.log("go to blog");
        break;
      case "scraps":
        console.log("go to scraps");
        break;
      case "cv":
        window.open("../resume/", "_blank");
        break;
      case "mastodon":
        window.open("https://awoo.pub/@jpegzilla", "_blank");
        break;
    }
    chooseProject(btn);
  }

  function chooseProject(btn) {
    switch (btn) {
      case "sl-ruler":
        $(".work-title").html(
          '<a target="_blank" href="https://github.com/jpegzilla/saltlines.ruler.js">SALT<wbr>LINES</a>'
        );
        $(".work-desc").text(`Mar 2019: a javascript utility`);
        break;

      case "bekin":
        $(".work-title").html(
          '<a target="_blank" href="https://gobekin.com/">BEKIN</a>'
        );
        $(".work-desc").text(
          `Dec 2017 - ongoing: web, mobile app design, development`
        );
        break;

      case "markzilla":
        $(".work-title").html(
          '<a target="_blank" href="https://github.com/jpegzilla/markzilla-parser">MARKZILLA</a>'
        );
        $(".work-desc").text(
          `April 2019: another javascript utility + a markup 'language'`
        );
        break;

      default:
        break;
    }
  }

  $(".close-button").on("click", () => {
    $(".whiteout").removeClass("active");
    $(".about-container").removeClass("fadeout");
  });

  $(document).mousemove(function(e) {
    mx = e.pageX;
    my = e.pageY;

    if ($(".section-2").hasClass("active")) {
      requestAnimationFrame(function() {
        $(".section-2-background p").css({
          left: -(mx * 2),
          top: -(my / 40)
        });
      });
      $(".about-text p, .circle-text, .paraSkew").css({
        left: mx / 40,
        top: my / 40
      });
    } else {
      requestAnimationFrame(function() {
        $(".section-1-background p").css({
          left: -(mx / 5),
          top: -(my / 40)
        });
      });
      $(".about-text p, .circle-text, .paraSkew").css({
        left: mx / 40,
        top: my / 40
      });
    }

    $(".m-data-x").text(mx.toString());
    $(".m-data-y").text(my.toString());

    if ($(".cursor").hasClass("menu") !== true) {
      $(".cursor, .c").addClass("active");

      if ($(".cursor").hasClass("stop") !== true) {
        $(".cursor").css({
          left: e.pageX,
          top: e.pageY
        });
      } else {
        e.preventDefault();
      }
      mx = e.pageX;
      my = e.pageY;

      $(".x").css({
        left: mx
      });
      $(".y").css({
        top: my
      });
      var nearMenu = calcDist($(".menu-button"), mx, my);
      var nearLink = calcDist($(".works, .about, .chat, .contact"), mx, my);

      var menuposition = $(".menu-button").offset();
      var linkposition = $(".chat").offset();
    }
  });

  $("img").on("click", e => {
    $(".image-viewer-container").addClass("active");
    $(".image-viewer img").attr("src", e.currentTarget.currentSrc);
  });

  $(".image-viewer-container").on("click", e => {
    $(".image-viewer-container").removeClass("active");
  });

  $(".whiteout-content").on("scroll", event => {
    let bekinH = $(".content-bekin").height();
    let saltH = $(".content-saltlines").height();
    let mkzH = $(".content-markzilla").height();
    let bekin = $(".whiteout-content").scrollTop();
    let comp = bekinH - (saltH + bekin);
    // if the divider reaches a certain point in the screen, switch the description
    // to the next item
    // for each new element, just follow the format. you just need to use the height of the element // and the offset().top like I did below and add more switch cases to chooseProject()
    let bekindiv = $(".content-bekin").offset().top;
    let saltlinesdiv = $(".content-saltlines").offset().top;
    let mkzdiv = $(".content-markzilla").offset().top;
    // determine what element is in the viewport

    if (saltlinesdiv < 100 && Math.abs(saltlinesdiv) < saltH) {
      $(".content-bekin").removeClass("active");
      if ($(".content-saltlines").hasClass("active") == false) {
        $(".content-saltlines").addClass("active");
        $(".work-title, .work-desc").addClass("hidden");
        setTimeout(function() {
          chooseProject("sl-ruler");
          setTimeout(function() {
            $(".work-title, .work-desc").removeClass("hidden");
          }, 300);
        }, 300);
      }
    }
    if (bekindiv < 100 && Math.abs(bekindiv) < bekinH) {
      $(".content-saltlines, .content-markzilla").removeClass("active");
      if ($(".content-bekin").hasClass("active") == false) {
        $(".content-bekin").addClass("active");
        $(".work-title, .work-desc").addClass("hidden");
        setTimeout(function() {
          chooseProject("bekin");
          setTimeout(function() {
            $(".work-title, .work-desc").removeClass("hidden");
          }, 300);
        }, 300);
      }
    }
    console.log({ mkzdiv, mkzH });
    if (mkzdiv < 200 && Math.abs(mkzdiv) < mkzH) {
      $(".content-bekin, .content-saltlines").removeClass("active");
      if ($(".content-markzilla").hasClass("active") == false) {
        $(".content-markzilla").addClass("active");
        $(".work-title, .work-desc").addClass("hidden");
        setTimeout(function() {
          chooseProject("markzilla");
          setTimeout(function() {
            $(".work-title, .work-desc").removeClass("hidden");
          }, 300);
        }, 300);
      }
    }

    if (event.originalEvent.deltaY < 1) {
      // scrolled up
    } else if (event.originalEvent.deltaY > 1) {
      // scrolled down
    }
  });

  $(".about-container, .projects-container").on("wheel", event => {
    let abHeight = $(".about-info").height();
    let abScroll = $(".about-container").scrollTop();
    let abDiff = abHeight - abScroll;
    let proHeight = $(".projects-container").height();
    let proDiff = proHeight - abScroll;
    let hDiff = Math.abs(proDiff) - Math.abs(abDiff);
    console.log(hDiff);
    if (hDiff < 0) {
      if ($(".section-2-background p").hasClass("works") == false) {
        $(".section-2-background p").addClass("works hidden");
        setTimeout(function() {
          $(".section-2-background p").text("WORKS");
          $(".section-2-background p").removeClass("hidden");
        }, 500);
      }
    } else if (hDiff > 0) {
      if ($(".section-2-background p").hasClass("works") == true) {
        $(".section-2-background p").removeClass("works");
        $(".section-2-background p").addClass("hidden");
        setTimeout(function() {
          $(".section-2-background p").text("ABOUT");
          $(".section-2-background p").removeClass("hidden");
        }, 500);
      }
    }
    if (event.originalEvent.deltaY < 1) {
      // scrolled up
      $(".about-text p, .paraSkew").css({
        transform: "skewY(-0.5deg) rotateY(-1deg)",
        transition: "transform 0.2s ease-in-out"
      });
      setTimeout(function() {
        $(".about-text p, .paraSkew").css({
          transform: "skew(0) rotate(0)"
        });
      }, 200);
    }
    if (event.originalEvent.deltaY > 1) {
      // scrolled down
      $(".about-text p, .paraSkew").css({
        transform: "skewY(0.5deg) rotateY(1deg)",
        transition: "transform 0.2s ease-in-out"
      });
      setTimeout(function() {
        $(".about-text p, .paraSkew").css({
          transform: "skew(0) rotate(0)"
        });
      }, 200);
    }
  });

  // determine offset bottom of element
  $(window).on(
    "wheel",
    _.debounce(
      function(event) {
        var trueY = $(".about-container")[0].scrollHeight;
        var divHeight = $(".about-container").height();
        var scrollLeft = trueY - divHeight;

        if (scrollTimer == false) {
          return false;
        }
        if ($(".section-3").hasClass("active")) {
          console.log("section 3.");
          return;
        } else if (scrollTimer == true) {
          console.log(
            "main debounced scroll event. should not fire in section 3."
          );
          if (event.originalEvent.deltaY < 1) {
            // scrolled up
            if ($("header").hasClass("hidden") == true) {
              $("header").removeClass("hidden");
            }
            if ($(".about-container").scrollTop() == 0) {
              if ($(".slider-int").hasClass("inactive")) {
                $(".slider-int").removeClass("inactive");
                setTimeout(function() {
                  $(".slider-int").addClass("reactive");
                }, 10);
              }
              p = 1;
              navigationManager(p);
            }
          } else {
            // scrolled down
            if ($("header").hasClass("hidden") == false) {
              $("header").addClass("hidden");
            }
            if (
              $(".section-2").hasClass("active") == true &&
              (scrollLeft === $(".about-container").scrollTop()) == true
            ) {
              // reveal footer here
              if ($(".footer-actual").hasClass("active") == false) {
                $(".footer-actual").addClass("active");
              }
            } else {
              if ($(".slider-int").hasClass("active")) {
                $(".slider-int").removeClass("active");
                setTimeout(function() {
                  $(".slider-int").addClass("inactive");
                }, 10);
              } else {
                $(".slider-int").removeClass("reactive");
                setTimeout(function() {
                  $(".slider-int").addClass("inactive");
                }, 10);
              }
              p = 2;
              navigationManager(p);
            }
          }
        }
      },
      500,
      {
        leading: true,
        trailing: false
      }
    )
  );

  $(".menu-button").on("click", e => {
    $(".menu-button").toggleClass("active");
    $("body").toggleClass("locked");
    if ($(".menu-inner").hasClass("active")) {
      $(".menu-inner").removeClass("active");
      $(".menu-inner").addClass("inactive");
    } else {
      $(".menu-inner").removeClass("inactive");
      $(".menu-inner").addClass("active");
    }
  });

  function closeMenu() {
    $(".menu-button").removeClass("active");
    $("body").removeClass("locked");
    $(".menu-inner").removeClass("active");
    $(".menu-inner").addClass("inactive");
  }

  function navigationManager(p) {
    switch (p) {
      case 1:
        $(".section-1").removeClass("inactive");
        $(".hyperlay").removeClass("active");
        $(".about").removeClass("sth");
        $(".m-data").removeClass("hidden");
        setTimeout(function() {
          $(".section-2").removeClass("active");
          $("header").removeClass("invert");
        }, 250);
        setTimeout(function() {
          $(".sidebar-right").removeClass("inactive");
        }, 2000);
        closeMenu();
        break;

      case 2:
        $(".hyperlay").addClass("active");
        closeMenu();
        $(".section-1").addClass("inactive");
        $(".m-data").addClass("hidden");
        setTimeout(function() {
          $(".section-2").addClass("active");
          $("header").addClass("invert");
        }, 750);
        $(".sidebar-right").addClass("inactive");

        break;
    }
  }
});
