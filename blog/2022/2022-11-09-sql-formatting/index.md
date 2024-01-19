---
title: Automated SQL query formatting via the clipboard (Mac)
draft: false
description: This post details how to automate SQL query formatting via the clipboard on a Mac.
tags: 
  - SQL
  - Formatting
  - Workflow Improvement
keywords: 
  - sql
  - formatting
  - workflow
authors: 
  - farlow
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

This post details how to automate SQL query formatting via the clipboard on a Mac. Want to copy a SQL query, run a command, and then have a nicely formatted query to paste elsewhere? This is the post for you.

<!--truncate-->

:::tip Try out the formatter before installing anything

This post highlights the [`sql-formatter`](https://www.npmjs.com/package/sql-formatter) Node.js package which has a [demo site](https://sql-formatter-org.github.io/sql-formatter/) you can interactively explore to determine whether or not this formatter is for you.

:::

## Prerequisites

:::caution Development on a Mac

This post was developed on a Mac. All ideas presented should be applicable elsewhere, but you may run into issues (e.g., `pbcopy` on MacOS does not exist as a standard Windows utility, but `clip` does exist and is the [rough equivalent](https://superuser.com/q/472598/1039386)).

:::

The functionalities remarked on in this post rely on the Node.js [`sql-formatter`](https://www.npmjs.com/package/sql-formatter) package; consequently, this post assumes you have [Node.js](https://nodejs.org/en/) [installed](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) on your system (I was using Node.js `v16.15.1` while writing and testing the contents of this article). This post also uses [`npx`](https://www.npmjs.com/package/npx), [an `npm` package runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b), for simplicity. If you use `npm 5.1` or earlier, then you cannot use `npx`; instead, you will need to install `sql-formatter` globally:

```bash
npm i -g sql-formatter
```

Finally, there is an option later in this post to use `ghead` (i.e., `head` from [GNU `coreutils`](https://formulae.brew.sh/formula/coreutils)). If you want to use this option, which is remarked on further below in the body of this post, then you may install GNU coreutils as follows (assuming you are using [Homebrew](https://formulae.brew.sh/) as your package manager on your Mac):

```bash
brew install coreutils
```

## Package details

Each of the "Key" options below links out to the [package documentation](https://github.com/sql-formatter-org/sql-formatter/tree/master/docs), but brief descriptions are given below. Additionally, the first value listed in the "Value options" table is the *default* value used when no value is explicitly provided.

### Configuration options

| Key | Description | Value options |
| :-- | :-- | :-- |
| [`language`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/language.md) | The SQL dialect to use | `sql`, `bigquery`, `db2`, `hive`, `mariadb`, `mysql`, `n1ql`, `plsql`, `postgresql`, `redshift`, `singlestoredb`, `spark`, `sqlite`, `transactsql`, `trino` |
| [`tabWidth`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/tabWidth.md) | Amount of indentation to use (option ignored when `useTabs` option is enabled) | `2` or other numeric quantities or the string `"\t"` for tabs |
| [`useTabs`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/useTabs.md) | To use tabs for indentation | `false`, `true` |
| [`keywordCase`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/keywordCase.md) | Uppercases or lowercases keywords | `preserve` (original casing), `upper`, `lower` |
| [`indentStyle`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/indentStyle.md) | Defines overall indentation style | `standard` (indents code by the amount specified by tabWidth option); `tabularLeft` (indents in tabular style with 10 spaces, aligning keywords to left); `tabularRight` (indents in tabular style with 10 spaces, aligning keywords to right) |
| [`logicalOperatorNewline`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/logicalOperatorNewline.md) | Newline before or after boolean operator (`AND`, `OR`, `XOR`) | `before`, `after` |
| [`tabulateAlias`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/tabulateAlias.md) | Aligns column aliases vertically | `false`, `true` |
| [`commaPosition`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/commaPosition.md) | Where to place the comma in column lists | `after`, `before`, `tabular` |
| [`expressionWidth`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/expressionWidth.md) | Maximum number of characters in parenthesized expressions to be kept on single line | `50` characters or some other numeric quantity |
| [`linesBetweenQueries`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/linesBetweenQueries.md) | How many newlines to insert between queries | `1` or some other positive integer (or boolean `false` for `0`) |
| [`denseOperators`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/denseOperators.md) | Packs operators densely without spaces | `false`, `true` |
| [`newlineBeforeSemicolon`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/newlineBeforeSemicolon.md) | Places semicolon on separate line | `false`, `true` |
| [`params`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/params.md) | Collection of values for placeholder replacement | `""` (default); Array (position placeholders) or Object (named placeholders); see [reference](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/params.md) |
| [`paramTypes`](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/paramTypes.md) | Specifies parameter placeholders types to support | `""` (default), `positional`, `numbered`, `named`, `quoted`; see [reference](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/paramTypes.md) |

### Example (personal configuration) {#sample-configuration}

I personally use the following configuration options:

```json
{
  "language": "mysql",
  "tabWidth": 2,
  "useTabs": false,
  "keywordCase": "upper",
  "indentStyle": "standard",
  "logicalOperatorNewline": "before",
  "tabulateAlias": false,
  "commaPosition": "after",
  "expressionWidth": 50,
  "linesBetweenQueries": 1,
  "denseOperators": false,
  "newlineBeforeSemicolon": false
}
```

This results in a query such as

```sql
select supplier_name,city from
(select * from suppliers join addresses on suppliers.address_id=addresses.id)
as suppliers
where supplier_id>500
order by supplier_name asc,city desc;
```

being transformed into

```sql
SELECT
  supplier_name,
  city
FROM
  (
    SELECT
      *
    FROM
      suppliers
      JOIN addresses ON suppliers.address_id = addresses.id
  ) AS suppliers
WHERE
  supplier_id > 500
ORDER BY
  supplier_name ASC,
  city DESC;
```

## Script version

```js title="Node.js script for using sql-formatter"
const { format } = require('sql-formatter');

// for copying formatted query to clipboard
function pbcopy(data) {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data); proc.stdin.end();
}

const QUERY_FORMAT_CONFIG = {
  "language": "mysql",
  "tabWidth": 2,
  "useTabs": false,
  "keywordCase": "upper",
  "indentStyle": "standard",
  "logicalOperatorNewline": "before",
  "tabulateAlias": false,
  "commaPosition": "after",
  "expressionWidth": 50,
  "linesBetweenQueries": 1,
  "denseOperators": false,
  "newlineBeforeSemicolon": false
}

const QUERY_STR = `
select supplier_name,city from
(select * from suppliers join addresses on suppliers.address_id=addresses.id)
as suppliers
where supplier_id>500
order by supplier_name asc,city desc;
`

const FORMATTED_QUERY = format(QUERY_STR, QUERY_FORMAT_CONFIG);
pbcopy(FORMATTED_QUERY) // copies formatted query to clipboard
```

Above, `FORMATTED_QUERY` is the actual formatted query. Using `pbcopy`, as defined at the beginning of the script, makes it possible to copy `FORMATTED_QUERY` to the clipboard. 

If you do not wish to execute a script and update the `FORMATTED_QUERY` value every single time (likely), then a shell-based solution may be desirable.

## Shell versions

As alluded to above as well as in this blog post's description, the ultimate goal would be to *not* have to run a file script with contents we would have to update whenever we wanted to format a SQL query. Specifically, it would be nice to be able to copy whatever query we wanted to format, use a shell alias to run a script on this copied content, and then automatically have the formatted output available for us to past wherever we wanted.

This section presents such solutions for the bash shell (place the alias in your bash profile) and fish shell (place the alias in your fish config). Both solutions make use of the [personal package configurations](#sample-configuration) provided previously. The `qtf` alias, which stands for *query to format*, can be used quite simply:

1. Copy the query to be formatted.
2. Run the `qtf` alias in your shell of choice (i.e., bash or fish).
3. Paste the newly formatted query to its desired target location.

:::caution Solutions use `ghead` to strip trailing newlines from formatted queries

Both solutions below make use of the `ghead` utility from [GNU `coreutils`](https://formulae.brew.sh/formula/coreutils) (see beginning of post for installation notes), but usage of this utility is not critical. 

Specifically, `ghead` is used to strip formatted queries of trailing newlines before the result is copied to the clipboard:

```bash
... | ghead -c -1 | pbcopy
```

For example, the query `SELECT * from geezers WHERE age<14` results in the following formatted query when `| ghead -c -1` precedes `| pbcopy` as depicted above (and as included in both solutions provided below):

```sql showLineNumbers
SELECT
  *
FROM
  geezers
WHERE
  age < 14
```

If `| ghead -c -1` is removed, then we will get the following formatted query:

```sql showLineNumbers
SELECT
  *
FROM
  geezers
WHERE
  age < 14

```

Note the presence of the trailing newline. I personally do not like this and choose to strip it away by means of `ghead`. If you do not mind its presence, then simply remove `| ghead -c -1` from both solutions below.

:::

### bash shell

```bash title=/Users/danielfarlow/.bash_profile
alias qtf='pbpaste | npx sql-formatter --config <(echo \"{ "language": "mysql", "tabWidth": 2, "useTabs": false, "keywordCase": "upper", "indentStyle": "standard", "logicalOperatorNewline": "before", "tabulateAlias": false, "commaPosition": "after", "expressionWidth": 50, "linesBetweenQueries": 1, "denseOperators": false, "newlineBeforeSemicolon": false }\") | ghead -c -1 | pbcopy'
```

### fish shell

```bash title=/Users/danielfarlow/.config/fish/config.fish
alias qtf='pbpaste | npx sql-formatter --config (echo \'{ "language": "mysql", "tabWidth": 2, "useTabs": false, "keywordCase": "upper", "indentStyle": "standard", "logicalOperatorNewline": "before", "tabulateAlias": false, "commaPosition": "after", "expressionWidth": 50, "linesBetweenQueries": 1, "denseOperators": false, "newlineBeforeSemicolon": false }\' | psub -f) | ghead -c -1 | pbcopy'
```

