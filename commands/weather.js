module.exports = async function (sock, chatId, message, city) {
  try {
    const response = await fetch(
      `http://wttr.in/${encodeURIComponent(city)}?format=j1`,
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const weather = data.current_condition[0];
    const location = data.nearest_area[0].areaName[0].value;

    const weatherText = `Weather in ${location}: ${weather.weatherDesc[0].value}. Temperature: ${weather.temp_C}°C.`;

    await sock.sendMessage(chatId, { text: weatherText }, { quoted: message });
  } catch (error) {
    console.error("Error fetching weather:", error);
    await sock.sendMessage(
      chatId,
      { text: "Sorry, I could not fetch the weather right now." },
      { quoted: message },
    );
  }
};
