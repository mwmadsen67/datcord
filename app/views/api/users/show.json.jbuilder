json.extract! @user, :id, :email, :username, :about_me
json.photoUrl url_for(@user.photo)