import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { NormalCard } from "../components/Cards";
import { Height } from "@mui/icons-material";

function AbstractViewer(props) {
    const {
        payload,
    } = props;

    // Extract title and abstract using regex
    // The text looks like Title: xxx Abstract: xxx

    let title_regex = /XYZ_Wiki_Title: (.*)\n/;
    let abstract_regex = /Abstract: (.*)/s;

    let title = payload.meta.title.match(title_regex)[1];
    let abstract = payload.meta.title.match(abstract_regex)[1];

    return <NormalCard sx={{
        margin: "30px",
        height: "500px",
        overflow: "auto"
    }}>
        <Typography variant="h4">
            {title}&nbsp;
            {/* <Button variant="contained" color="primary"
                onClick={() => window.open("https://"+payload.pdf, "_blank")}
            >pdf</Button> */}
        </Typography>
        <br />
        {/* <TextBlock prefix="Abstract: " text={abstract} /> */}
        <Typography variant="weaknessDescription">
            <b>Abstract: </b>
            {abstract}
        </Typography>
    </NormalCard>
}

export default AbstractViewer;