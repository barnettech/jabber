README.txt
---------------
The Jabber Module integrates Drupal with any xmpp service.
Whether you want to integrate with Google Talk as we do
at Babson College or with AIM, or any other instant messenger
service that uses XMPP, Droogle will integrate your users
to enable XMPP communication on your Drupal site.  The module
will create a roster ("friends list") from your current friends
list for your JID you sign in with, and as well it will construct
a list from the organic groups you are a member of within your
Drupal installation.  If you are authorized to speak with the Jids
in your list the names will turn grey, green or red if the person
is afk, available or away respectively.  At Babson we use Google
for education and there is a setting so users in your domain
do not need authorization to chat.

INSTALL
--------------
1.)  Install Jabber like any other Drupal module,
  Put the jabber module in your modules folder and then 
  enable the module in admin/build/modules (or preferably use
  drush to download and enable your module :)

2.)  In admin/settings/jabber set the profile field where jabber
  will pull user's google passwords from.
 
3.)  In admin/user/profile configure the profile field you
  named in the above step.

4.)  Realize Jabber will be pulling your user's JIDs from the 
  standard Drupal email address field associated with each user's
  profile.  So on GTalk my username (jid) might be username@gmail.com
  or on AIM username@aol.com so then my Drupal email address would
  have to be one of these usernames (jids) and then I would need to 
  input my Google password into the profile field configured above 
  for my user.

5.)  This module utilizes the strophe javascript library and other 
  jquery and jquery ui files. 
