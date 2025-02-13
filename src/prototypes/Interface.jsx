import './Interface.css';
import { useState } from 'react';
import { useEffect } from 'react';
import AbstractViewer from './AbstractViewer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { AppBar, Divider, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from '../components/themes';
import { useMediaQuery } from '@mui/material';
import { parseCsvFromPublic, loadClaimsFromString } from '../components/utils';
import ReviewerViewer from './ReviewViewer';
import AddMore from './AddMore';
import WeaknessCard from './WeaknessCard';
import LeadViewer from './LeadViewer';
import WikiViewer from './WikiViewer';
import SentenceViewer from './SentenceViewer';




function Interface(props) {


    const {
        theme,
        payload,
    } = props;

    const [hoverWeakness, setHoverWeakness] = useState(-1);
    const [focusIndex, setFocusIndex] = useState(-1);
    const [weaknessDescs, setWeaknessDescs] = useState([]);
    const [baseClaims, setBaseClaims] = useState([]);
    const [backgroundColors, setBackgroundColors] = useState([]);
    const [selections, setSelections] = useState([]);
    const [numAlreadyAdded, setNumAlreadyAdded] = useState(0);


    useEffect(() => {
    }, [payload]);


    const prePopulateWeakness = () => {
        console.log(payload);
        const rawClaims = payload.Extracted_Claims

        const claimPairs = loadClaimsFromString(rawClaims);
        console.log(claimPairs);

        const deconClaims = claimPairs.map((pair) => {
            return pair.subclaim;
        });
        // console.log(deconClaims);
        setWeaknessDescs([...deconClaims]);

        const baseCalims = claimPairs.map((pair) => {
            return pair.subclaim;
        });
        setBaseClaims([...baseCalims]);



        // console.log(typeof predClaims);
        // setWeaknessDescs([...predClaims]);
    }

    useEffect(() => {
        prePopulateWeakness();
    }, [])

    return (
        <Box>
            <Box sx={{
                padding: "30px",
                width: "100%",
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{
                            height: "95vh",
                            overflow: "auto",
                        }}>
                            {/* <ReviewerViewer payload={payload} hoverWeakness={hoverWeakness} theme={theme} focusIndex={focusIndex}
                                backgroundColors={backgroundColors}
                                selections={selections}
                                setSelections={setSelections}
                            /> */}
                            <LeadViewer payload={payload} />
                            <WikiViewer payload={payload} />
                            {/* <LeadViewer payload={payload} /> */}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        {/* add box below that includes the "Claim_Sentence" from the payload */}
                        <Box sx={{
                            padding: "0px",
                        }}>
                            <SentenceViewer payload={payload} />
                        </Box>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            height: "95vh",
                            overflow: "auto",
                        }}>
                            {weaknessDescs.map((desc, index) => {
                                return (
                                    <Box sx={{
                                            order: index,
                                        }}
                                        key={"weakness-card-" + index}
                                    >
                                        <WeaknessCard
                                            theme={theme}
                                            index={index}
                                            weakness={desc}
                                            claim={baseClaims[index]}
                                            backgroundColor={backgroundColors[index]}
                                            removeColor={() => {
                                                const newColors = [...backgroundColors];
                                                newColors.splice(index, 1);
                                                setBackgroundColors(newColors);
                                            }}
                                            focused={index == focusIndex}
                                            setFocusIndex={setFocusIndex}
                                            setWeaknessDesc={(v) => {
                                                const newWeaknessDescs = [...weaknessDescs];
                                                newWeaknessDescs[index] = v;
                                                setWeaknessDescs(newWeaknessDescs);
                                            }}
                                            setWeaknessDescs={setWeaknessDescs}
                                            setHoverWeakness={setHoverWeakness}
                                            setSelections={setSelections}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                padding: "30px"
            }}>
                <Button type="submit" variant="contained" color="primary" sx={{
                    width: "100%",
                    borderRadius: "10px",
                }}>
                    <Typography variant="h5" sx={{
                    }}>
                        Submit
                    </Typography>
                </Button>
            </Box>
            <AddMore
                numAlreadyAdded={numAlreadyAdded}
                weaknessDescs={weaknessDescs}
                setNumAlreadyAdded={setNumAlreadyAdded}
                setWeaknessDescs={setWeaknessDescs}
                setFocusIndex={setFocusIndex}
                setBackgroundColors={setBackgroundColors}
            />
            <input type="hidden" id="descriptions" name="descriptions" value={JSON.stringify(weaknessDescs)} />
            <input type="hidden" id="selections" name="selections" value={JSON.stringify(selections)} />
        </Box>
    );
}

export default Interface;