This is a project to generate a kind of comparison of two versions of the documentary The Beatles Anthology, cataloguing the differences between the 2003 DVD version and the 2025 Disney+ version.

For each episode `N` (where `N` is between 1 and 8) there are markdown files `N-dvd.md` and `N-dplus.md`. Specific moments in episodes are quoted, prefixed by a timestamp. These are the transcript files. NEVER modify these files.

# Comparison

To perform a comparison for episode `N` you need to compare those files and produce `N-mapping.json`. Your task is to identify items that are the same or substantially the same, perhaps containing some of the same text, maybe with parts added or removed.

The format of the output is a JSON object containing a `"mappings"` array of objects like:

```json
{
    "dvd": 4,
    "dplus": 7,
    "matchType": "similar",
    "note": "Ringo discusses record process"
}
```

The `matchType` can be either `"similar"` or `"same"`. The `dvd` and `dplus` properties are integers giving the position of the items in the file.

To aid with this, the script `add-indices.js` will generate a pair of processed file for a specified episode:

```
node add-indices.js <episode-number>
```

The output files for episode `N` will be:

-   `N-dvd-indexed.md`;
-   `N-dplus-indexed.md`;

These will have the positional index as a prefix at the start of each item, in square brackets. You should work from these "indexed" files to generate the `N-mapping.json` file for the episode.

DO NOT include mapping items for items that only appear in `dvd` but not `dplus`, or `dplus` but not `dvd`. ONLY include mapping items where both those properties are populated. If you find an item for which there is nothing sufficiently similar in the opposite file, do not add anything for that item to the mapping file.

Once the mapping file is created, you can update `comparison.html` so that there is a button to display the new episode.
