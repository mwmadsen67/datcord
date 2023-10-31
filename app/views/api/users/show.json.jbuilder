# debugger
json.user do
  json.extract! @user, :id, :email, :username, :about_me
  if @user.photo.attached?
    # json.photoUrl url_for(@user.photo)
    json.photoUrl @user.photo.url
  else
    json.photoUrl ""
  end
end