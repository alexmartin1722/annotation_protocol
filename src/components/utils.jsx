import Papa from "papaparse";

const parseCsvFromPublic = async (fileName) => {
  try {
    const response = await fetch(`/${fileName}`);
    if (!response.ok) {
      throw new Error("Failed to load the CSV file.");
    }

    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true, // Assumes the first row contains column headers
        skipEmptyLines: true,
        complete: (result) => {
          try {
            const parsedData = result.data.map((row) => {
              if (row.payload) {
                // return {
                //   ...row,
                //   payload: JSON.parse(row.payload), // Parse the Python-dumped string
                // };
                // console.log("row.payload", row.payload);
                // return JSON.parse(row.payload);
                return loadJsonPayload(row.payload);
              }
              return row;
            });
            resolve(parsedData);
          } catch (e) {
            reject(new Error("Error parsing the payload field. Ensure it's a valid Python-dumped JSON string."));
          }
        },
        error: (err) => {
          reject(new Error(`Error parsing the CSV file: ${err.message}`));
        },
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

function loadJsonPayload(json_string) {
  try {
    return JSON.parse(json_string);
  } catch (e) {
    // console.log("json_string", json_string);
    // parse string looking for the keys: Wiki_Title, Wiki_All_Text, Claim_Context, Claim_Sentence, Extracted_Claims
    const keys = ["Wiki_Title", "Wiki_All_Text", "Claim_Context", "Claim_Sentence", "Extracted_Claims"];

    // make the new json_string 
    var newPayload = {};

    // get the title "{'Wiki_Title': '2018 FIFA World Cup', 'Wiki_All_Text': ...
    var title_string = json_string.split("Wiki_All_Text")
    var title = title_string[0].split("Wiki_Title")[1].split("',")[0].replace("': '", "");
    // console.log("title", title);
    newPayload["Wiki_Title"] = title;

    // get the Wiki_All_Text 
    // const all_text_string = title_string[1].split("Claim_Context")
    var all_text_partition = title_string[1].split("Claim_Context");
    var all_text_string = all_text_partition[0].replace("': ", "");
    all_text_string = all_text_string.replace(", '", "");
    // console.log("all_text_string", all_text_string);
    newPayload["Wiki_All_Text"] = all_text_string;

    // get the Claim_Context
    var context_string = all_text_partition[1].split("Claim_Sentence");
    var context = context_string[0].replace("': ", "");
    context = context.replace(", '", "");
    // console.log("context_string", context);
    newPayload["Claim_Context"] = context;


    // get the Claim_Sentence
    var sentence_string = context_string[1].split("Extracted_Claims");
    var sentence = sentence_string[0].replace("': '", "");
    // clean up " ', '" from end of sentence
    sentence = sentence.replace("', '", "");
    // console.log("sentence_string", sentence);
    newPayload["Claim_Sentence"] = sentence;

    // get the Extracted_Claims
    var claims_string = sentence_string[1]
    claims_string = claims_string.replace("': ", "");
    claims_string = claims_string.substring(0, claims_string.length - 1);
    // console.log("claims_string", claims_string);

    newPayload["Extracted_Claims"] = claims_string;

    return newPayload;
  }
}

function applyProps(Fn, props) {
    return (e = {}) => <Fn {...e} {...props} />
}

export { applyProps, parseCsvFromPublic, loadJsonPayload };