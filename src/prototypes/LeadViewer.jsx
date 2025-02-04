import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { NormalCard } from "../components/Cards";
import { Height } from "@mui/icons-material";

function LeadViewer(props) {
    const {
        payload,
    } = props;

    let context = payload.Claim_Context;

    return <NormalCard sx={{
        margin: "30px",
        height: "300px",
        overflow: "auto"
    }}>
        {/* <TextBlock prefix="Lead: " text={lead} /> */}
        <Typography variant="weaknessDescription">
            <b>Context of the sentence: </b>
            {context}
        </Typography>
    </NormalCard>
}

export default LeadViewer;