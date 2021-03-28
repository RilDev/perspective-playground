// generated with https://htmlcsstoimage.com
// package.json script: "generate-logo": "node src/scripts/generate-logo.mjs"
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import axios from "axios";

const createImage = async () => {
  // modify logo here
  const svgPath =
    "M16.56,12L19.23,20H4.78L7.44,12H16.56M7,1L3,5L7,9V6H11V4H7V1M17,1V4H13V6H17V9L21,5L17,1M18,10H6L2,22H22L18,10Z";
  const svgFill = "#ffffff";
  const backgroundColor = "#6d28d9";

  // leave everything below this line unchanged
  const html = /*html*/ `
  <div>
    <svg width="150" height="150" viewBox="0 0 24 24">
      <path d=${svgPath}>
      </path>
    </svg>
  </div>`;

  const css = `
  body { 
    background-color: transparent; 
  }
  div { 
    background: ${backgroundColor}; 
    display: inline-block; 
    padding: 15px; 
    border-radius: 50%; 
  }
  svg {
    fill: ${svgFill};
  }`;

  const payload = { html, css };

  const headers = {
    auth: {
      username: process.env.HCTI_USER_ID,
      password: process.env.HCTI_API_KEY,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      "https://hcti.io/v1/image",
      JSON.stringify(payload),
      headers
    );

    console.log(response.data.url);
  } catch (error) {
    console.error(error);
  }
};

createImage();
