import { Flex, Grid, Box, Button } from "@radix-ui/themes";
import { useRef, useState } from "react";
import clsx from "clsx";
import saveAs from "file-saver";
import DomToImage from "dom-to-image";

function App() {
  const mandalartRef = useRef(null);
  const buttonsRef = useRef(null);
  const main = [
    "건강",
    "경제",
    "커리어",
    "여가",
    "관계",
    "자기관리",
    "마인드",
    "경험",
  ];
  const [detail, setDetail] = useState(-1);
  const [confirm, setConfirm] = useState(false);
  const [detailInputs, setDetailInputs] = useState(
    JSON.parse(localStorage.getItem("mandalart")) ||
      Array.from({ length: 8 }, () => [...Array.from({ length: 8 }, () => "")])
  );

  const isMain = detail === -1;

  const list = isMain ? main : detailInputs[detail];

  const handleMainClick = (detailIndex) => {
    setDetail(detailIndex);
  };

  const handleListClick = (index) => {
    if (isMain) {
      handleMainClick(index);
    }
  };

  const handleDetailInputChange = (e, index) => {
    setDetailInputs((details) => {
      const result = [
        ...details.slice(0, detail),
        details[detail].map((detailInput, i) =>
          i === index ? e.target.value : detailInput
        ),
        ...details.slice(detail + 1),
      ];
      localStorage.setItem("mandalart", JSON.stringify(result));
      return result;
    });
  };

  const handleGoBackClick = () => {
    if (confirm) {
      setConfirm(false);
    }
    setDetail(-1);
  };

  const handleConfirmClick = () => {
    setConfirm(true);
  };

  const handleDownload = async () => {
    if (!mandalartRef.current) return;

    const scale = 10;

    DomToImage.toPng(mandalartRef.current, {
      filter: (node) => node !== buttonsRef.current,
      width: mandalartRef.current.clientWidth * scale,
      height: mandalartRef.current.clientHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "center",
      },
    })
      .then((blob) => {
        saveAs(blob, `mandalart.png`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Flex
      ref={mandalartRef}
      direction="column"
      justify="center"
      align="center"
      width="100vw"
      py="5em"
      gap="5"
      className="bg-white h-screen font-GowunDodum"
    >
      <Box className="text-xl font-bold text-indigo-900">2025 만다라트</Box>
      {!confirm && (
        <Grid columns="3" gap="10px" rows="repeat(3, 100px)" width="auto">
          {list?.slice(0, 4).map((detail, index) => (
            <Flex
              key={index}
              onClick={() => handleListClick(index)}
              align="center"
              justify="center"
              width="100px"
              height="100px"
              className={clsx("rounded-xl bg-indigo-100 text-indigo-900")}
            >
              {isMain ? (
                detail
              ) : (
                <textarea
                  value={list[index]}
                  onChange={(e) => handleDetailInputChange(e, index)}
                  className={clsx(
                    "w-full h-full bg-indigo-100 rounded-xl p-3 focus:outline-blue-400 text-center"
                  )}
                />
              )}
            </Flex>
          ))}
          <Flex
            align="center"
            justify="center"
            width="100px"
            height="100px"
            className={clsx("rounded-xl text-indigo-900 bg-yellow-100")}
          >
            {isMain ? "2025" : main[detail]}
          </Flex>
          {list?.slice(4).map((detail, index) => (
            <Flex
              key={index}
              onClick={() => handleListClick(index + 4)}
              align="center"
              justify="center"
              width="100px"
              height="100px"
              className={clsx("rounded-xl bg-indigo-100 text-indigo-900")}
            >
              {isMain ? (
                detail
              ) : (
                <textarea
                  value={list[index + 4]}
                  onChange={(e) => handleDetailInputChange(e, index + 4)}
                  className={clsx(
                    "w-full h-full bg-indigo-100 rounded-xl p-3 focus:outline-blue-400 text-center"
                  )}
                />
              )}
            </Flex>
          ))}
        </Grid>
      )}
      {/* 확인하기 */}
      {confirm && (
        <Grid columns="3" gap="0.4em" rows="repeat(3, 7.1em)" width="auto">
          {detailInputs.slice(0, 4).map((detailInput, detailIndex) => (
            <Grid
              key={detailIndex}
              columns="3"
              rows="repeat(3, 2.4em)"
              gap="0"
              width="auto"
            >
              {detailInput?.slice(0, 4).map((detail, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify="center"
                  width="4.8em"
                  height="4.8em"
                  className={clsx(
                    "bg-yellow-50 bg-opacity-80 text-indigo-900 text-[8px] p-1 text-center",
                    {
                      "rounded-tl-lg": index === 0,
                      "rounded-tr-lg": index === 2,
                    }
                  )}
                >
                  {detail}
                </Flex>
              ))}
              <Flex
                align="center"
                justify="center"
                width="4.8em"
                height="4.8em"
                className={clsx(
                  "text-[8px] p-1  text-center text-indigo-900 bg-indigo-100"
                )}
              >
                {main[detailIndex]}
              </Flex>
              {detailInput?.slice(4).map((detail, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify="center"
                  width="4.8em"
                  height="4.8em"
                  className={clsx(
                    "bg-yellow-50 bg-opacity-80 text-indigo-900 text-[8px] p-1  text-center",
                    {
                      "rounded-bl-lg": index === 1,
                      "rounded-br-lg": index === 3,
                    }
                  )}
                >
                  {detail}
                </Flex>
              ))}
            </Grid>
          ))}
          <Grid columns="3" rows="repeat(3, 2.4em)" gap="0" width="auto">
            {main?.slice(0, 4).map((detail, index) => (
              <Flex
                key={index}
                align="center"
                justify="center"
                width="4.8em"
                height="4.8em"
                className={clsx(
                  "text-[8px] p-1  text-center bg-indigo-100 text-indigo-900",
                  {
                    "rounded-tl-lg": index === 0,
                    "rounded-tr-lg": index === 2,
                  }
                )}
              >
                {detail}
              </Flex>
            ))}
            <Flex
              align="center"
              justify="center"
              width="4.8em"
              height="4.8em"
              className={clsx(
                "text-[8px] p-1  text-center text-indigo-900 bg-yellow-100"
              )}
            >
              2025
            </Flex>
            {main.slice(4).map((detail, index) => (
              <Flex
                key={index + 4}
                align="center"
                justify="center"
                width="4.8em"
                height="4.8em"
                className={clsx(
                  "text-[8px] p-1  text-center bg-indigo-100 text-indigo-900",
                  {
                    "rounded-bl-lg": index === 1,
                    "rounded-br-lg": index === 3,
                  }
                )}
              >
                {detail}
              </Flex>
            ))}
          </Grid>
          {detailInputs.slice(4).map((detailInput, detailIndex) => (
            <Grid
              key={detailIndex + 1}
              columns="3"
              rows="repeat(3, 2.4em)"
              gap="0"
              width="auto"
            >
              {detailInput?.slice(0, 4).map((detail, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify="center"
                  width="4.8em"
                  height="4.8em"
                  className={clsx(
                    "text-[8px] p-1  text-center bg-yellow-50 bg-opacity-80 text-indigo-900",
                    {
                      "rounded-tl-lg": index === 0,
                      "rounded-tr-lg": index === 2,
                    }
                  )}
                >
                  {detail}
                </Flex>
              ))}
              <Flex
                align="center"
                justify="center"
                width="4.8em"
                height="4.8em"
                className={clsx(
                  "text-[8px] p-1  text-center text-indigo-900 bg-indigo-100"
                )}
              >
                {main[detailIndex + 4]}
              </Flex>
              {detailInput?.slice(4).map((detail, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify="center"
                  width="4.8em"
                  height="4.8em"
                  className={clsx(
                    "text-[8px] p-1  text-center bg-yellow-50 bg-opacity-80 text-indigo-900",
                    {
                      "rounded-bl-lg": index === 1,
                      "rounded-br-lg": index === 3,
                    }
                  )}
                >
                  {detail}
                </Flex>
              ))}
            </Grid>
          ))}
        </Grid>
      )}

      <Flex direction="row" gap="1" ref={buttonsRef}>
        {(!isMain || confirm) && (
          <Button onClick={handleGoBackClick}>이전</Button>
        )}
        {!confirm && <Button onClick={handleConfirmClick}>확인하기</Button>}
        {confirm && <Button onClick={handleDownload}>저장</Button>}
      </Flex>
    </Flex>
  );
}

export default App;
