import { format } from "date-fns";
import { isEmptyCheck } from "./validation";
import { DEFAULT_NEWS_IMAGE } from "../config/constant";
import { ethers } from "ethers";
import bridgeData from "../config/bridgeData.json";

export const DateFormatNews = (dateString) => {
  try {
    // Replace space with 'T' to make the string ISO 8601 compatible
    const isoDateString = dateString.replace(" ", "T");
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date: " + dateString;
    }

    const formattedDate = format(date, "MMM d, yyyy");
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date: " + dateString;
  }
};

export const getNewsPostTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);

  const diffInSeconds = Math.floor((now - past) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    return `${diffInYears} years ago`;
  }
};

export const shortDescription = (description, maxLength = 100) => {
  if (isEmptyCheck(description)) {
    return description;
  } else {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  }
};

export const calculateReadingTime = (description) => {
  if (isEmptyCheck(description)) {
    return 0;
  } else {
    const wordsPerMinute = 200; // You can adjust this value as needed
    const words = description.trim().split(/\s+/).length; // Split the text by spaces and count the words
    const minutes = Math.ceil(words / wordsPerMinute); // Calculate the reading time in minutes
    return minutes;
  }
};

export const isImageValid = (imageURL, callback) => {
  if (isEmptyCheck(imageURL)) {
    return callback(DEFAULT_NEWS_IMAGE);
  } else {
    const img = new Image();
    img.onload = () => callback(imageURL);
    img.onerror = () => callback(DEFAULT_NEWS_IMAGE);
    img.src = imageURL;
  }
};

export const shortWalletAddress = (address) => {
  if (!address || typeof address !== "string" || address.length <= 10) {
    return address;
  }

  const start = address.substring(0, 5);
  const end = address.substring(address.length - 5);
  return `${start}...${end}`;
};

export const convertToETH = (balance) => {
  const etherValue = ethers.formatEther(balance);
  return etherValue;
};

// Helper function to paginate data
export const paginate = (data, page, pageSize) => {
  const offset = (page - 1) * pageSize;
  return data.slice(offset, offset + pageSize);
};

export const formatNumberWithCommas = (input) => {
  if (input === 0 || input === "0") {
    return "0";
  }

  // Try to convert the input to a number
  const number = Number(input);

  // Check if the conversion is valid
  if (isNaN(number)) {
    return "0"; // Return "0" for invalid inputs
  }

  // If the number is greater than or equal to 10,000, use shorthand notation with up to 2 decimal places
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`; // Format in millions with 2 decimal places
  } else if (number >= 10_000) {
    return `${(number / 1_000).toFixed(2).replace(/\.00$/, "")}K`; // Format in thousands with 2 decimal places
  }

  // Convert number to string and split into integer and decimal parts
  const [integerPart, decimalPart] = number.toString().split(".");

  // Format integer part with Indian numbering system
  const lastThreeDigits = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  // If there are no other digits, just return the last three digits
  const formattedIntegerPart =
    otherDigits.length > 0
      ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        lastThreeDigits
      : lastThreeDigits;

  // Combine formatted integer part with decimal part
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
};

// Helper function to paginate data
export const formatDataTime = (dateString) => {
  const date = new Date(dateString);

  // Define month names in short form
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, year, hour, minutes, and seconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const convertToWei = (amount, decimals) => {
  return ethers.parseUnits(amount, decimals).toString();
};

export const getChainImageUrlByNetworkId = (networkId) => {
  const chainList = bridgeData.chains;
  const chain = chainList.find(
    (chain) => chain.destinationNetwork === networkId,
  );
  return chain ? chain.imageUrl : null;
};

export const getChainNameByNetworkId = (networkId) => {
  const chainList = bridgeData.chains;
  const chain = chainList.find(
    (chain) => chain.destinationNetwork === networkId,
  );
  return chain ? chain.chainName : null;
};

export const getChainSymbolByNetworkId = (networkId) => {
  const chainList = bridgeData.chains;
  const chain = chainList.find(
    (chain) => chain.destinationNetwork === networkId,
  );
  return chain ? chain.defaultTokenSymbol : null;
};

export const getTokenImageUrlByNetworkId = (tokenAddress) => {
  const tokenList = bridgeData.tokens;
  const token = tokenList.find(
    (t) =>
      t.tokenAddressEth.toLowerCase() === tokenAddress.toLowerCase() ||
      t.tokenAddressPrism.toLowerCase() === tokenAddress.toLowerCase(),
  );

  return token ? token.tokenURL : null;
};

export const getTokenSymbolByNetworkId = (tokenAddress) => {
  const tokenList = bridgeData.tokens;
  const token = tokenList.find(
    (t) =>
      t.tokenAddressEth.toLowerCase() === tokenAddress.toLowerCase() ||
      t.tokenAddressPrism.toLowerCase() === tokenAddress.toLowerCase(),
  );

  return token ? token.tokenSymbol : null;
};

export const convertFromWei = (amountInWei, tokenAddress) => {
  const tokenList = bridgeData.tokens;
  const token = tokenList.find(
    (t) =>
      t.tokenAddressEth.toLowerCase() === tokenAddress.toLowerCase() ||
      t.tokenAddressPrism.toLowerCase() === tokenAddress.toLowerCase(),
  );
  const decimals = token?.tokenDecimals ?? 18;

  return ethers.formatUnits(amountInWei, decimals).toString();
};

export const formatGasFees = (amount) => {
  return ethers.formatUnits(amount, "gwei").toString();
};
