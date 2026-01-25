"use client";

import React, { useState, useEffect, useRef } from "react";
/* MUI */
import { Box, Stack, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
/* components */
import Item from "@/components/StackItem";
import WorkGallery from "@/components/WorkGallery";
/* video module */
import ReactPlayer from "react-player";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40,
    width: "100%",
    backgroundColor: "#000",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.5)",
    "&.Mui-selected": {
      color: "#000",
    },
  }),
);

export default function WorkContent({ work }) {
  const [value, setValue] = useState(0);

  if (!work) {
    return <div>Loading...</div>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ marginRight: { xs: "0px", md: "100px" } }}>
        <Box
          sx={{
            fontSize: { xs: "36px", md: "36px" },
            lineHeight: { xs: "49px", md: "49px" },
            marginBottom: { xs: "8px", md: "8px" },
          }}
        >
          {work.title_en && <div className="workTitle">{work.title_en}</div>}
          {work.title_en !== work.title && (
            <div className="workTitle">{work.title}</div>
          )}
        </Box>
        <div className="workPlaceYear">
          <div>{work.subtitle_en}</div>
          <div>{work.subtitle},</div>
          <div>{work.year}</div>
        </div>
      </Box>
      <Box sx={{ marginTop: "48px" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing="4%">
          <Item sx={{ width: { xs: "100%", md: "48%" } }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  <StyledTab label="English" {...a11yProps(0)} />
                  <StyledTab label="中文" {...a11yProps(1)} />
                </StyledTabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Box>
                  <div
                    className="workDesEN"
                    dangerouslySetInnerHTML={{
                      __html: work.description_en_us.desctiption,
                    }}
                  />
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box>
                  <div
                    className="workDesTW"
                    dangerouslySetInnerHTML={{
                      __html: work.description_zh_tw.desctiption,
                    }}
                  />
                </Box>
              </CustomTabPanel>
            </Box>
          </Item>
          <Item sx={{ width: { xs: "100%", md: "48%" } }}>
            <Box>
              <WorkGallery photos={work.images} />
            </Box>
            <Box
              sx={{
                marginTop: { xs: "10px", md: "10px", lg: "15px", xl: "15px" },
              }}
            >
              {work.video && (
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    src={work.video.link}
                    controls
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "16/9",
                    }}
                  />
                </div>
              )}
            </Box>
            <Box sx={{ marginTop: { xs: "24px", md: "24px" } }}>
              {work.video && (
                <div
                  className="vidDesR"
                  dangerouslySetInnerHTML={{
                    __html: work.video.description,
                  }}
                />
              )}
            </Box>
            <Box>
              <div className="workDesL">
                {work.description_en_us.urls.length > 0 && (
                  <Box
                    sx={{
                      paddingBottom: { xs: "20px", md: "20px" },
                      paddingTop: { xs: "50px", md: "50px" },
                    }}
                  >
                    <div>review ↓↓↓ </div>
                  </Box>
                )}
                {work.description_en_us.urls.map((url) => (
                  <div key={url.id}>
                    {url.id && (
                      <div>
                        <Box>
                          <div>{url.name}</div>
                          <a href={url.link} target="_blank" rel="noreferrer">
                            <p className="reviewLink">{url.link}</p>
                          </a>
                        </Box>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Box>
            <Box>
              <div className="workDesR">
                <Box
                  sx={{
                    paddingBottom: { xs: "20px", md: "20px" },
                    paddingTop: { xs: "50px", md: "50px" },
                  }}
                >
                  {work.description_zh_tw.urls.length > 0 && (
                    <div>評論 ↓↓↓ </div>
                  )}
                </Box>
                {work.description_zh_tw.urls.map((url) => (
                  <div key={url.id}>
                    {url.id && (
                      <div>
                        <Box pad={{ top: "10px" }}>
                          <div>{url.name}</div>
                          <a href={url.link} target="_blank" rel="noreferrer">
                            <p className="reviewLink">{url.link}</p>
                          </a>
                        </Box>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Box>
          </Item>
        </Stack>
      </Box>
    </>
  );
}
