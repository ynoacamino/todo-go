CREATE TABLE user (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_password VARCHAR(200) NOT NULL,
  username VARCHAR(100) NOT NULL,
  photo VARCHAR(200) NOT NULL,
  complete_name VARCHAR(150) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE task (
  task_id INT NOT NULL AUTO_INCREMENT,
  task_name VARCHAR(100) NOT NULL,
  task_content VARCHAR(200) NOT NULL,
  task_state BOOLEAN NOT NULL,
  task_created_date INT NOT NULL,
  task_user INT NOT NULL,
  PRIMARY KEY (task_id)
);




