# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.

pip install pdfplumber

"""

import pdfplumber

base_dr = "/home/guitar79/Desktop/KBox/2021년/G2.대기과학및실험/beamer/ref/"
filename = "The Atmosphere_an introduction to meteorology_Frederick K. Lutgens, Edward J. Tarbuck[13ed](2016).pdf"

fullname = "{}{}".format(base_dr, filename)

pdf_obj = pdfplumber.open(fullname)
result = ""
#for page_no in range(541) :
for page_no in range(90, 91) :
    #page_no = 70
    page = pdf_obj.pages[page_no]
    images_in_page = page.images
    for image in  images_in_page :
        #image = images_in_page[0]
        page_height = page.height
        page_height = 1104
        page_width = page.width
        page_width = 943
        min_px = 100
        if image['x1']-image['x0'] > min_px :
            #image_bbox = (image['x0'], page_height - image['y1'], image['x1'], page_height - image['y0'])
            #result += "\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
            #    .format(image['x0'], page_height - image['y1'], image['x1'], page_height - image['y0'], page_no)
            #print("\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
            #      .format(image['x0'], page_height - image['y1'], image['x1'], page_height - image['y0'], page_no))
            #result += "\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
            #    .format(image['x0'], page_height - image['y1'], page_width-image['x1'], image['y0'], page_no)
            #print("\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
            #    .format(image['x0'], page_height - image['y1'], page_width-image['x1'], image['y0'], page_no))
            #1
            result += "\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
                .format(int(image['x0']), int(page_height - image['y1']), int(page_width-image['x1']), int(image['y0']), page_no+1)
            print("\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
                .format(int(image['x0']), int(page_height - image['y1']), int(page_width-image['x1']), int(image['y0']), page_no+1))
            
            #2
            #result += "\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
            #    .format(int(image['x0']), int(image['y1']), int(page_width-image['x1']), int(page_height - image['y0']), page_no+1)
            #print("\\includegraphics[trim={} {} {} {}, clip, page={}, width=\\textwidth]\n"\
            #    .format(int(image['x0']), int(image['y1']), int(page_width-image['x1']), int(page_height - image['y0']), page_no+1))

                
            #image_bbox = (image['x0'], page_height - image['y1'], image['x1'], page_height - image['y0'])
            #cropped_page = page.crop(image_bbox)
            #image_obj = cropped_page.to_image(resolution=400)
            #image_obj.save("{}{}_{}_{}.png".format(base_dr, str(page_no), image['x0'], image['y0']))

with open("{}only_image_info_{}2.txt".format(base_dr, str(min_px)), 'w') as f:
    f.write(result)