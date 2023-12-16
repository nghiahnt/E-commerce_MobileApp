const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "da2zmkoep",
  api_key: "447823446685951",
  api_secret: "jHmV6sSBTvdIvJ_5awIzsElq2MA",
});

async function uploadPhotos(photos) {
  try {
    const uploadPromises = photos.map((photo) => {
      return cloudinary.uploader.upload(photo.path);
    });
    const photoResults = await Promise.all(uploadPromises);
    const photoUrls = photoResults.map((result) => result.url);
    return photoUrls;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { cloudinary, uploadPhotos };
