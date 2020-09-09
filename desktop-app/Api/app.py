from flask import Flask, request
import video_process
import violence
import os
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "zzzzz"

@app.route('/testVideo',methods=['GET', 'POST'])
def test_video():

    path_out = request.args.get('path_out')
    video_path = request.args.get('video_path')

    if video_path != None and path_out != None:

        frames = video_process.video_to_frames(video_path)
        print('video to frames',len(frames),frames.shape)
        results = violence.predict_violence(frames) 
        print(results)
        new_frames = []
        print(len(results))
        for i in range(0,len(results)):

            if results[i] == 0:

                b_frame = video_process.frame_border(frames[i],'green')

            else:

                b_frame = video_process.frame_border(frames[i],'red')

            new_frames.append(b_frame)
        
        print(len(new_frames))
        video_process.frames_to_video(new_frames,path_out)

        return 'done'

    return "error"

app.run()