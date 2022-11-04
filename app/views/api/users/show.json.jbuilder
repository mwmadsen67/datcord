json.user do
  json.extract! @user, :id, :email, :username, :about_me
  if @user.photo.attached?
    json.photoUrl url_for(@user.photo)
  else
    json.photoUrl ""
  end
end