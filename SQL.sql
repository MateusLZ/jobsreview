CREATE DATABASE jobsreview;

CREATE USER 'jobsreview'@'localhost' IDENTIFIED BY 'jobsreview';

GRANT ALL PRIVILEGES ON jobsreview.* TO 'jobsreview'@'localhost';

SELECT * from vagas