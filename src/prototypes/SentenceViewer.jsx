import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { NormalCard } from "../components/Cards";
import { Height } from "@mui/icons-material";
import { loadClaimsFromString } from '../components/utils';

function SentenceViewer(props) {
    const {
        payload,
    } = props;

    // let title = payload.Wiki_Title;
    // let text = payload.Wiki_All_Text;
    let sentence = payload.Claim_Sentence

    let claims = loadClaimsFromString(payload.Extracted_Claims);


    let claimList = claims.map((claim, index) => {
        return claim.subclaim;
    });
    


    // TODO: FIGURE OUT HOW TO HIDE THE FULL TEXT UNLESS THE READER WISHES TO UNCOVER IT
    return <NormalCard sx={{
        // margin: "0px",
        // height: "100px",
        overflow: "auto"
    }}>
        <Typography variant="p1">
            <b>Sentence: </b>
            {sentence}
        </Typography>
        <br />
        {/* <Typography variant="p1">
            <b>Claims: </b>
            {claimText}
        </Typography> */}
        {/* claimText on each line */}
        <Typography variant="p1">
            {/* <b>Claims: </b> */}
            {claimList.map((claim, index) => {
                return <div key={index}><b>Claim {index+1}: </b>{claim}</div>
            })}
        </Typography>


    </NormalCard>
}

export default SentenceViewer;