import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, Button, Checkbox, CircularProgress, FormGroup, Input, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const JokesGenerator = () => {
    const [category, setCategory] = useState("Any");
    const [language, setLanguage] = useState("en");
    const [flags, setFlags] = useState("none");
    const [responseFormat, setResponseFormat] = useState("json");
    const [searchString, setSearchString] = useState("");
    const [numberOfJokes, setNumberOfJokes] = useState(1);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // console.log(flags, "flags");
    }, [flags]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const inputData = { category, language, flags, responseFormat, searchString: searchString.trim(), numberOfJokes };
        console.log(inputData, "inputData");
        let url = `https://v2.jokeapi.dev/joke/${category}?type=single`;
        if (flags === "none") {
            url = `https://v2.jokeapi.dev/joke/${category}?type=single`;
        } else if (flags !== "none" && flags.length > 0) {
            url = `https://v2.jokeapi.dev/joke/${category}?type=single&blacklistFlags=${flags}`;
        }
        if (language !== "en") {
            url += `&lang=${language}`;
        }
        if (searchString.trim().length > 0) {
            url += `&contains=${searchString.replaceAll(" ", "%20")}`;
        }
        console.log(url);
        // return;;

        try {
            setOutput("");
            setError("");
            setIsLoading(true);
            const config = {
                method: "get",
                url
            };
            const response = await axios(config);
            console.log(response, "response");
            if (response.data.error === true) {
                toast.error(response.data.message);
            }
            setOutput(response.data);
        } catch (error) {
            console.log(error, "error");
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Jokes Generator</h3>

            <form onSubmit={handleSubmit}>
                <FormControl className={styles.categoryContainer}>
                    <FormLabel id="category-buttons-group-label">Category</FormLabel>
                    <RadioGroup
                        aria-labelledby="category-buttons-group-label"
                        defaultValue="Any"
                        name="radio-buttons-group"
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                    >
                        <Box sx={{ display: "flex" }}>
                            <FormControlLabel value="Any" control={<Radio />} label="Any" />
                            <FormControlLabel value="Programming" control={<Radio />} label="Programming" />
                            <FormControlLabel value="Miscellaneous" control={<Radio />} label="Miscellaneous" />
                            <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
                            <FormControlLabel value="Pun" control={<Radio />} label="Pun" />
                            <FormControlLabel value="Spooky" control={<Radio />} label="Spooky" />
                            <FormControlLabel value="Christmas" control={<Radio />} label="Christmas" />
                        </Box>
                    </RadioGroup>
                </FormControl>

                <FormControl className={styles.languageContainer}>
                    <FormLabel id="language-buttons-group-label">Language</FormLabel>
                    <RadioGroup
                        aria-labelledby="language-buttons-group-label"
                        defaultValue="de"
                        name="radio-buttons-group"
                        value={language}
                        onChange={event => setLanguage(event.target.value)}
                    >
                        <Box sx={{ display: "flex" }}>
                            <FormControlLabel value="cs" control={<Radio />} label="czech" />
                            <FormControlLabel value="en" control={<Radio />} label="english" />
                            <FormControlLabel value="fr" control={<Radio />} label="french" />
                            <FormControlLabel value="de" control={<Radio />} label="german" />
                            <FormControlLabel value="pt" control={<Radio />} label="portuguese" />
                            <FormControlLabel value="es" control={<Radio />} label="spanish" />
                        </Box>
                    </RadioGroup>
                </FormControl>

                <FormControl className={styles.flagsContainer}>
                    <FormLabel id="flags-group-label">Flags</FormLabel>
                    <RadioGroup
                        aria-labelledby="flags-group-label"
                        name="radio-buttons-group"
                        value={flags}
                        onChange={event => setFlags(event.target.value)}
                    >
                        <Box sx={{ display: "flex" }}>
                            <FormControlLabel value="none" control={<Radio />} label="none" />
                            <FormControlLabel value="nsfw" control={<Radio />} label="nsfw" />
                            <FormControlLabel value="religious" control={<Radio />} label="religious" />
                            <FormControlLabel value="political" control={<Radio />} label="political" />
                            <FormControlLabel value="racist" control={<Radio />} label="racist" />
                            <FormControlLabel value="sexist" control={<Radio />} label="sexist" />
                            <FormControlLabel value="explicit" control={<Radio />} label="explicit" />
                        </Box>
                    </RadioGroup>
                </FormControl>

                <TextField
                    value={searchString}
                    onChange={event => setSearchString(event.target.value)}
                    className={styles.searchString}
                    fullWidth
                    label="Search string"
                    variant="outlined"
                />

                <Button
                    className={styles.submitButton}
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ height: "30px", width: "100px", overflow: 'hidden' }}
                >
                    {isLoading
                        ? <CircularProgress style={{ padding: "15px" }} />
                        : "Submit"}
                </Button>
            </form>

            <hr style={{ marginTop: "30px" }} />
            <div style={{ backgroundColor: "#000", color: "#fff", padding: "15px" }}>
                {output.joke}
            </div>
            <pre>
                {JSON.stringify(output, null, 2)}
            </pre>
        </div>
    )
}

export default JokesGenerator

