CREATE TABLE patient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sample_id TEXT,
  sexe CHARACTER(1)
);

CREATE TABLE sv (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_annot TEXT,
  chrom INTEGER,
  start INTEGER,
  end INTEGER,
  type INTEGER,
  length INTEGER,
  chrom_new INTEGER,
  start_new INTEGER,
  end_new INTEGER
);

CREATE TABLE methode (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  descritption TEXT
);

CREATE TABLE info_annot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  info TEXT
);

CREATE TABLE info_sv (
  info INTEGER,
  patient_sv INTEGER,
  PRIMARY KEY (info, patient_sv),
  FOREIGN KEY (info) REFERENCES info_annot (id),
  FOREIGN KEY (patient_sv) REFERENCES patient_sv (id)
);

CREATE TABLE patient_sv (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  sv_id INTEGER,
  sv_gene INTEGER,
  frequence INTEGER,
  methode INTEGER,
  id_annot TEXT,
  ref_annot TEXT,
  alt_annot TEXT,
  qual_annot INTEGER,
  filter TEXT,
  FOREIGN KEY (patient_id) REFERENCES patient (id),
  FOREIGN KEY (sv_id) REFERENCES sv (id),
  FOREIGN KEY (sv_gene) REFERENCES sv_gene (id),
  FOREIGN KEY (methode) REFERENCES methode (id)
);

CREATE TABLE patient_sv_commun (
  patient1 INTEGER,
  patient2 INTEGER,
  PRIMARY KEY (patient1, patient2),
  FOREIGN KEY (patient1) REFERENCES patient_sv (id),
  FOREIGN KEY (patient2) REFERENCES patient_sv (id)
);

CREATE TABLE gene (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  hi INTEGER,
  tris INTEGER,
  ddd_gene TEXT,
  acmg BOOLEAN,
  synz REAL,
  misz REAL,
  pli REAL,
  delz REAL,
  dupz REAL,
  cnvz REAL,
  mim_number INTEGER,
  phenotype TEXT,
  inheritance TEXT,
  morbidGene BOOLEAN,
  morbidGane_Candidate BOOLEAN
);

CREATE TABLE sv_gene (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gene INTEGER,
  sv INTEGER,
  nm TEXT,
  cds_length INTEGER,
  tx_length INTEGER,
  location TEXT,
  location2 TEXT,
  INTEGERersect_start INTEGER,
  INTEGERersect_end INTEGER,
  promoter TEXT,
  FOREIGN KEY (gene) REFERENCES gene (id),
  FOREIGN KEY (sv) REFERENCES sv (id)
);

