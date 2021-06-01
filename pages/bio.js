import dynamic from "next/dynamic";

import { Box } from "grommet";

const Nav = dynamic(() => import("../components/nav"));

function Bio() {
  return (
    <div>
      <Nav />
      <Box pad="medium" align="start" margin={{ left: "12px" }}>
        <p>Biography is here!</p>
      </Box>
    </div>
  );
}

export default Bio;
