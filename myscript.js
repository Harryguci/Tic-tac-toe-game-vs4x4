let player = 0;
// 0 Or 1
var sizeGameScreen = Math.min(
  parseInt($(".game-screen").css("width")),
  parseInt($("#game-screen").css("height"))
);
$(document).ready(function () {
  $(".message").fadeOut();
  $(".game-screen").css({
    width: `${sizeGameScreen}px`,
    height: `${sizeGameScreen}px`,
  });

  $(".game-screen__main .row").ready(function () {
    var crow = $(".game-screen__main .row").length;

    var h = parseInt($(".game-screen").css("height")) - 100;
    if ($(document).width() < 600) {
      h = $(document).width();
      console.log($(document).width());
    }
    h /= crow;
    $(".game-screen__main .row").css({
      height: h + "px",
    });
  });

  function checkRemain() {
    var is = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (matrix[i][j] === -1) is = true;
      }
    }
    return is;
  }

  $(".game-screen__cell").click(function () {
    let current_className = $(this).attr("class");
    if (current_className.search("active") >= 0) console.log("Oke");
    else {
      var id_cur_element = $(this).attr("data-ID");
      var x = parseInt(id_cur_element.substr(0, 1));
      var y = parseInt(id_cur_element.substr(2, 1));
      matrix[x][y] = player;

      if (player) player = 0;
      else player = 1;
      $(this).addClass("active");
      if (player) {
        $(this).html("X");
        $(this).css({ color: "red" });
      } else {
        $(this).html("O");
        $(this).css({ color: "blue" });
      }

      var isWin = checkWin();
      if (isWin != -1) {
        if (isWin == 0) {
          console.log("Player 1 win");
          {
            $(".message__inner").html(
              'Player X win !<br><button type="button" class="reload-btn" onClick="window.location.reload();">Play again</button>'
            );
            $(".message").fadeIn();
          }
        } else if (isWin == 1) {
          $(".message__inner").html(
            'Player O win !<br><button type="button" class="reload-btn" onClick="window.location.reload();">Play again</button>'
          );
          $(".message").fadeIn();
        }
      }
      console.log(matrix);
      if (!checkRemain()) {
        $(".message__inner").html(
          'Match Draw !<br><button type="button" class="reload-btn" onClick="window.location.reload();">Play again</button>'
        );
        $(".message").fadeIn();
      }
    }
  });
  // const winMatrix[8][3] = {{0, 1, 2}, // Check first row.
  //               {3, 4, 5}, // Check second Row
  //               {6, 7, 8}, // Check third Row
  //               {0, 3, 6}, // Check first column
  //               {1, 4, 7}, // Check second Column
  //               {2, 5, 8}, // Check third Column
  //               {0, 4, 8}, // Check first Diagonal
  //               {2, 4, 6}}; // Check second Diagonal

  const matrix = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
  ];
  function checkWin() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let x = matrix[i][j];
        if (x === -1) continue;

        if (
          i > 0 &&
          i + 1 < 4 &&
          matrix[i - 1][j] === x &&
          matrix[i + 1][j] === x
        ) {
          if (
            i - 1 === 0 &&
            (matrix[i + 2][j] === -1 || matrix[i + 2][j] === x)
          )
            return x;
          else if (matrix[i - 2][j] === -1 || matrix[i - 2][j] === x) return x;
        }

        if (
          j > 0 &&
          j + 1 < 4 &&
          matrix[i][j - 1] === x &&
          matrix[i][j + 1] === x
        ) {
          if (
            j - 1 === 0 &&
            (matrix[i][j + 2] === -1 || matrix[i][j + 2] === x)
          )
            return x;
          else if (matrix[i][j - 2] === -1 || matrix[i][j - 2] === x) return x;
        }

        if (
          i - 1 >= 0 &&
          j - 1 >= 0 &&
          i + 1 < 4 &&
          j + 1 < 4 &&
          matrix[i - 1][j - 1] === x &&
          matrix[i + 1][j + 1] === x
        ) {
          if (i - 1 === 0 && j + 1 === 3) return x;
          else if (j - 1 === 0 && i + 1 === 3) return x;
          else if (i - 1 === 0 && (matrix[3][3] === x || matrix[3][3] === -1))
            return x;
          else if (i - 1 > 0 && (matrix[0][0] === x || matrix[0][0] === -1))
            return x;
        }

        if (
          i - 1 >= 0 &&
          j - 1 >= 0 &&
          i + 1 < 4 &&
          matrix[i + 1][j - 1] === x &&
          matrix[i - 1][j + 1] === x
        ) {
          if ((i === 1 && j === 1) || (i === 2 && j === 2)) return x;
          else if (i - 1 === 0 && (matrix[3][0] === x || matrix[3][0] === -1))
            return x;
          else if (i - 1 > 0 && (matrix[0][3] === x || matrix[0][3] === -1))
            return x;
        }
      }
    }
    return -1;
  }
});

// [i - 1][j + 1] [i][j] [i + 1][j - 1]
