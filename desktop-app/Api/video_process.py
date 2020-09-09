import cv2
import numpy as np

def video_to_frames(v_path):
  frames = []
  cap = cv2.VideoCapture(v_path)
  while cap.isOpened():
    success,image = cap.read()
    if success == False:
      break
    else:
      image = cv2.resize(image ,(150 ,150))
      frames.append(image)
  frames = np.array(frames)/255
  return frames

def frame_border(frame,color):
  if color == 'red':
    frame = cv2.copyMakeBorder(frame, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value= (0,0,170))
    frame = cv2.putText(frame, 'violence', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,170), 2, cv2.LINE_AA) 
  elif color == "green":
    frame = cv2.copyMakeBorder(frame, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value= (0,170,0))
    frame = cv2.putText(frame, 'no violence', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,170,0), 2, cv2.LINE_AA)
  return frame

def frames_to_video(frames,path_out):
  height, width, layers = frames[0].shape
  fourcc = cv2.VideoWriter_fourcc(*'MP4V')
  video = cv2.VideoWriter(path_out, 0x7634706d, 20, (width,height))
  for image in frames:
    image = (image*255).astype(np.uint8)
    video.write(image)
  
  video.release()
  cv2.destroyAllWindows()
 


