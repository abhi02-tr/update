import { readFile, writeFile } from "fs/promises";

export  const writeData = async (data) => {
    await writeFile(new URL("./otp.txt", import.meta.url), JSON.stringify(data));
  };


export const readData = async () => {
    let data;
    try {
      data = await readFile(new URL("./otp.txt", import.meta.url), "utf-8");
      return JSON.parse(data);
    } catch (error) {
      data = [];
      await writeData(data);
      return data;
    }
  };
  
  // write data in task.txt
