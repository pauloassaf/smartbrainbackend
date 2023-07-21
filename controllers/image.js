const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = 'cfd3d65baa38434a9653239d75e8ddd0';
    const USER_ID = 'assaf';       
    const APP_ID = 'my-first-application-7xw10k';
    const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageUrl;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions
  }

const handleApiCall = (req,res) => {
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => res.json(response))
    .catch(error => console.log('error', error));

}



const handleImage = (req,res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}