let time = "1h 30m 20s";

const testTime = time.split(" ");

const convertTime = () => {
  let newTime = {
    h: 0,
    m: 0,
    s: 0,
  };

  if (testTime.length == 3) {
    haveHoures = true;
  } else {
    haveHoures = false;
  }

  if (haveHoures == true) {
    newTime.h = testTime[0].replace("h", "");
  }

  if (haveHoures == true) {
    newTime.m = testTime[1].replace("m", "");
  }

  if (haveHoures == true) {
    newTime.s = testTime[2].replace("s", "");
  }

  if (haveHoures == false) {
    newTime.h = 0;
  }

  if (haveHoures == false) {
    newTime.m = testTime[0].replace("m", "");
  }

  if (haveHoures == false) {
    newTime.s = testTime[1].replace("s", "");
  }

  console.log(newTime);
};

convertTime();