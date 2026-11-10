import { useState } from "react";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { FiCopy, FiRefreshCw, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const categories = ["Any", "Programming", "Miscellaneous", "Dark", "Pun", "Spooky", "Christmas"];
const languages = [["cs", "Czech"], ["en", "English"], ["fr", "French"], ["de", "German"], ["pt", "Portuguese"], ["es", "Spanish"]];
const flags = ["none", "nsfw", "religious", "political", "racist", "sexist", "explicit"];

function JokesGenerator() {
    const [category, setCategory] = useState("Any");
    const [language, setLanguage] = useState("en");
    const [flag, setFlag] = useState("none");
    const [searchString, setSearchString] = useState("");
    const [output, setOutput] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const generateJoke = async () => {
        setOutput({});
        setError("");
        setIsLoading(true);

        const params = new URLSearchParams({ type: "single" });
        if (flag !== "none") params.set("blacklistFlags", flag);
        if (language !== "en") params.set("lang", language);
        if (searchString.trim()) params.set("contains", searchString.trim());

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(
                `https://v2.jokeapi.dev/joke/${category}?${params.toString()}`,
                { signal: controller.signal },
            );
            const data = await response.json().catch(() => null);
            if (!response.ok || !data || data.error || typeof data.joke !== "string") {
                const message = data?.message || "No joke matched those settings. Try another filter combination.";
                setError(message);
                toast.error(message);
                return;
            }
            setOutput(data);
        } catch (requestError) {
            const message = requestError.name === "AbortError"
                ? "The request timed out. Please try again."
                : "The joke service could not be reached. Check your connection and try again.";
            setError(message);
            toast.error(message);
        } finally {
            window.clearTimeout(timeoutId);
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        generateJoke();
    };

    const copyJoke = async () => {
        if (!output.joke) return;
        try {
            await navigator.clipboard.writeText(output.joke);
            toast.success("Joke copied to clipboard.");
        } catch {
            toast.error("Copying is not available in this browser.");
        }
    };

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>JOKE API PLAYGROUND</p>
                <h1 className={styles.heading}>Find your next quick laugh.</h1>
                <p className={styles.heroText}>Choose a category, filter out the topics you do not want, and fetch a single joke from the JokeAPI service.</p>
                <div className={styles.heroStats}><span><strong>7</strong> categories</span><span><strong>6</strong> languages</span><span><strong>1</strong> joke per request</span></div>
            </section>

            <section id="generator" className={styles.workspace}>
                <form className={styles.formCard} onSubmit={handleSubmit}>
                    <div className={styles.cardHeading}><span>Build your request</span><small>All filters are optional</small></div>
                    <FormControl className={styles.control} component="fieldset">
                        <FormLabel id="category-label">Category</FormLabel>
                        <RadioGroup aria-labelledby="category-label" value={category} onChange={(event) => setCategory(event.target.value)}>
                            <Box className={styles.optionGrid}>{categories.map((item) => <FormControlLabel key={item} value={item} control={<Radio size="small" />} label={item} />)}</Box>
                        </RadioGroup>
                    </FormControl>

                    <FormControl className={styles.control} component="fieldset">
                        <FormLabel id="language-label">Language</FormLabel>
                        <RadioGroup aria-labelledby="language-label" value={language} onChange={(event) => setLanguage(event.target.value)}>
                            <Box className={styles.optionGrid}>{languages.map(([value, label]) => <FormControlLabel key={value} value={value} control={<Radio size="small" />} label={label} />)}</Box>
                        </RadioGroup>
                    </FormControl>

                    <FormControl className={styles.control} component="fieldset">
                        <FormLabel id="flag-label">Blacklist flag</FormLabel>
                        <RadioGroup aria-labelledby="flag-label" value={flag} onChange={(event) => setFlag(event.target.value)}>
                            <Box className={styles.optionGrid}>{flags.map((item) => <FormControlLabel key={item} value={item} control={<Radio size="small" />} label={item} />)}</Box>
                        </RadioGroup>
                    </FormControl>

                    <TextField value={searchString} onChange={(event) => setSearchString(event.target.value)} label="Optional search phrase" placeholder="Try: developer" fullWidth />
                    <Button className={styles.submitButton} type="submit" variant="contained" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={17} color="inherit" /> : <FiSearch />}>
                        {isLoading ? "Finding a joke" : "Get a joke"}
                    </Button>
                </form>

                <aside className={styles.resultCard} aria-live="polite">
                    <div className={styles.cardHeading}><span>Your result</span><small>{output.category || "Waiting for a request"}</small></div>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {output.joke ? (
                        <>
                            <blockquote>{output.joke}</blockquote>
                            <div className={styles.resultActions}>
                                <button type="button" onClick={copyJoke}><FiCopy aria-hidden="true" /> Copy joke</button>
                                <button type="button" onClick={generateJoke}><FiRefreshCw aria-hidden="true" /> Try again</button>
                            </div>
                            <details className={styles.rawResponse}><summary>View API response</summary><pre>{JSON.stringify(output, null, 2)}</pre></details>
                        </>
                    ) : !error && <div className={styles.emptyResult}><FiSearch aria-hidden="true" /><p>Your joke will appear here.</p><span>Pick a few filters and get started.</span></div>}
                </aside>
            </section>

            <section id="about" className={styles.about}>
                <span className={styles.aboutNumber}>01</span>
                <div><h2>Simple filters, better control.</h2><p>The app sends a focused request to JokeAPI and keeps the response readable. Search phrases and blacklist flags help you guide the result without adding extra steps.</p></div>
            </section>
        </div>
    );
}

export default JokesGenerator;
