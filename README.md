# New-Day-Church

## TO-DO List
[x] - Basic copy/landing page
[x] - add pics
[x] - clean up the style a bit
[x] - track notes and plan
[x] - Add Basic additional Pages
    [x] - About
    [x] - New Here?
    [x] - Ministries
    [x] - Events
        [x] - research cal plugins
    [x] - Media
    [x] - Give
        - should be external link?
    [x] - Contact
        [x] - make the contact email send
    [x] - Team
[x] - Nav Bar shrink and stay at top
[x] Get new logo from Sheryl
[x] Add Beliefs Page
    - with Link to Baptist Belief statement page Baptist Faith and Message 2000.
[x] Switch to use more of the block backgrounds and less cards
[x] update team pics
    - get from grace
[x] - Make About Page(s) a single page
    - possibly more stuff # Give, and Contact
[x] - Remove the email address section on the bottom/contact bar
[x] Then get it up and going with AWS
    - connect to GoDaddy?
[x] - figure out certs for .net 
[x] - Get a localServer.js to run locally and maintain seperate for debug vs main server.js
[x] - fix the typo
[] - get more pics and bios from Grace
[] - reassess visuals
    - and fonts?
[x] - figure out what's wrong with security stuff
    - nothing lmao - just browser cache
    - shut down serve
    - run
        '''
        sudo certbot certonly --standalone \
  -d newdaychurchnashville.org -d www.newdaychurchnashville.org \
  -d newdaychurchnashville.net -d www.newdaychurchnashville.net \
  -d newdaychurchnashville.mobi -d www.newdaychurchnashville.mobi
        '''

    - then
        '''
        sudo cp /etc/letsencrypt/live/newdaychurchnashville.org/fullchain.pem ~/certs/
sudo cp /etc/letsencrypt/live/newdaychurchnashville.org/privkey.pem ~/certs/
sudo chown $USER:$USER ~/certs/fullchain.pem ~/certs/privkey.pem
chmod 600 ~/certs/fullchain.pem ~/certs/privkey.pem
        '''
[] figure out why some stuff is still sus?

then get it up and going

## Future ideas
- Add a map


## General Notes
- removed this to make Not cards
    - " p-4 rounded-4 shadow-sm w-100""
- SSH "ssh -i jonnykey.pem ec2-user@23.20.141.197"