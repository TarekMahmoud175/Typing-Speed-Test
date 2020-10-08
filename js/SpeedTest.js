$(document).ready(() => {

  const text = ["The text to test.","New Challenge", "Now I can write Faster"];
  const testWrapper = $(".test-wrapper");
  const testArea = $("#test-area");
  let originText = $("#origin-text").children("p")[0].innerText;
  const resetButton = $("#reset");
  const changeText = $("#change");
  let lastIndex = 0;

  let ms = 0,
    sec = 0,
    min = 0,
    interva_l;
  // function to change index of to change the phrase  on clicking th button
function changeIndex() {
    let index = Math.round(Math.random() * (text.length-1));
    if (index == lastIndex) {
     return changeIndex();
    } else {
      lastIndex = index;
      return index;
    }
  };
//Function to change the origin text value randomly 
  changeText.click((event) => {
    event.preventDefault();
    let newIndex = changeIndex();
    let newValue = text[newIndex];
    originText = newValue;
    $("#origin-text").children("p")[0].innerText = newValue;
  });

  // show two digits of the timer
  function minTwoDigits(n) {
    return (n < 10 ? "0" : "") + n;
  }
  // count time
  let counter = () => {
    ms++;
    $("#timer").html(
      minTwoDigits(min) + ":" + minTwoDigits(sec) + ":" + minTwoDigits(ms)
    );
    if (ms == 99) {
      sec++;
      ms = 0;
    }
    if (sec == 59) {
      min++;
      sec = 0;
    }
  };
  //start timer when the text area is focused
  let start_timer = () => {
    if (testArea.val().length === 0) {
      interva_l = setInterval(counter, 10);
    }
  };
  // calculate final time and open modal
  let modal = () => {
    let Time_taken =
      minTwoDigits(min) + ":" + minTwoDigits(sec) + ":" + minTwoDigits(ms);
    $(".modal-body").html("You took " + Time_taken + "<br> Good job");
    $("#modal").modal("show");
  };
  let compare = () => {
    // on text change
    if (testArea.val() === originText.slice(0, testArea.val().length)) {
      if (
        testArea.val() === originText &&
        testArea.val().length === originText.length
      ) {
        testWrapper.css({
          borderColor: "green",
        });
        // clearInterval;
        interva_l = clearInterval(interva_l);
        modal();
      } else {
        testWrapper.css({
          borderColor: "white",
        });
      }
    } else {
      testWrapper.css({
        borderColor: "red",
      });
    }
  };
  // clear all data and every thing as first time
  let clear = () => {
    testArea.val("");
    min = 0;
    sec = 0;
    ms = 0;
    interva_l = clearInterval(interva_l);
    testWrapper.css({
      borderColor: "grey",
    });
    $("#timer").html("00:00:00");
  };

  //close Modal which opens after the text is written right
  $("#tryAgain").click(() => {
    $("#modal").modal("hide");
    clear();
  });

  //Chain to start timer  and compare the text with the origin every key press
  testArea.keypress(start_timer).keyup(compare);

  //reset button click to clear text area and timer
  resetButton.click(() => {
    clear();
  });
});
