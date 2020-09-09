from keras.models import load_model
import numpy as np

def predict_violence(frames):
    
    model = load_model('./Api/model.h5')
    prediction = model.predict(frames,batch_size=32)

    return prediction.argmax(axis=1)


