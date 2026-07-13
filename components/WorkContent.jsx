"use client";

import { useState } from "react";
import { Box, Stack, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Item from "@/components/StackItem";
import WorkGallery from "@/components/WorkGallery";
import ReactPlayer from "react-player";

const TAB_EN = 0;
const TAB_ZH = 1;

const TITLE_SX = {
  fontSize: "36px",
  lineHeight: "49px",
  marginBottom: "8px",
};

const REVIEW_SECTION_SX = {
  paddingTop: { xs: "50px", md: "50px" },
  paddingBottom: { xs: "20px", md: "20px" },
};

const COLUMN_SX = { width: { xs: "100%", md: "48%" } };

function RichText({ className, html }) {
  if (!html) return null;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function ReviewLinks({ heading, urls, className }) {
  const validUrls = urls?.filter((url) => url.id) ?? [];
  if (validUrls.length === 0) return null;

  return (
    <div className={className}>
      <Box sx={REVIEW_SECTION_SX}>
        <div>{heading}</div>
      </Box>
      {validUrls.map((url) => (
        <Box key={url.id}>
          <div>{url.name}</div>
          <a href={url.link} target="_blank" rel="noreferrer">
            <p className="reviewLink">{url.link}</p>
          </a>
        </Box>
      ))}
    </div>
  );
}

function WorkHeader({ work }) {
  return (
    <Box sx={{ marginRight: { xs: "0px", md: "100px" } }}>
      <Box sx={TITLE_SX}>
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
  );
}

function WorkVideo({ video }) {
  if (!video) return null;

  return (
    <>
      <Box sx={{ marginTop: { xs: "10px", md: "10px", lg: "15px", xl: "15px" } }}>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            src={video.link}
            controls
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
            }}
          />
        </div>
      </Box>
      <Box sx={{ marginTop: { xs: "24px", md: "24px" } }}>
        <RichText className="vidDesR" html={video.description} />
      </Box>
    </>
  );
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`work-tabpanel-${index}`}
      aria-labelledby={`work-tab-${index}`}
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

function tabA11yProps(index) {
  return {
    id: `work-tab-${index}`,
    "aria-controls": `work-tabpanel-${index}`,
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

function WorkDescriptions({ descriptionEn, descriptionZh, tab, onTabChange }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={tab}
          onChange={(_, newValue) => onTabChange(newValue)}
          aria-label="Work description language"
          variant="fullWidth"
        >
          <StyledTab label="English" {...tabA11yProps(TAB_EN)} />
          <StyledTab label="中文" {...tabA11yProps(TAB_ZH)} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={tab} index={TAB_EN}>
        <RichText
          className="workDesEN"
          html={descriptionEn?.desctiption}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={TAB_ZH}>
        <RichText
          className="workDesTW"
          html={descriptionZh?.desctiption}
        />
      </CustomTabPanel>
    </Box>
  );
}

export default function WorkContent({ work }) {
  const [tab, setTab] = useState(TAB_EN);

  if (!work) {
    return null;
  }

  const descriptionEn = work.description_en_us;
  const descriptionZh = work.description_zh_tw;

  return (
    <>
      <WorkHeader work={work} />
      <Box sx={{ marginTop: "48px" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing="4%">
          <Item sx={COLUMN_SX}>
            <WorkDescriptions
              descriptionEn={descriptionEn}
              descriptionZh={descriptionZh}
              tab={tab}
              onTabChange={setTab}
            />
          </Item>
          <Item sx={COLUMN_SX}>
            <WorkGallery photos={work.images} />
            <WorkVideo video={work.video} />
            <ReviewLinks
              heading="review ↓↓↓"
              urls={descriptionEn?.urls}
              className="workDesL"
            />
            <ReviewLinks
              heading="評論 ↓↓↓"
              urls={descriptionZh?.urls}
              className="workDesR"
            />
          </Item>
        </Stack>
      </Box>
    </>
  );
}
