Display Rules
=============

Mode vs. Verbose Matrix
-----------------------

### Which Properties to Display?

[//]: # (TODO: This table is not up to date)
NOTE: This table is not up to date. Summary has been split into a separate flag

|         | display                                        | display summary                                                     | structure                                      | structure summary                                                  |
|---------|------------------------------------------------|---------------------------------------------------------------------|------------------------------------------------|--------------------------------------------------------------------|
| normal  | - with data<br/> - format for human-redability | - with data required in summary<br/> - format for human-readability | - with data<br/>- format in tree structure     | - with data required in summary<br/>- formatted in tree structure  |   
| verbose | - normal rules +<br/> - display extra context  | - normal rules +<br/> - display extra context                       | - normal rules +<br/> - ALL defined properties | - normal rules +<br/> - ALL defined properties required in summary |   

| has data | mode            | verbose | element/primitive | part of summary | SHOW    |
|----------|-----------------|---------|-------------------|-----------------|---------|
| `no`     | display         | `no`    | element           | `yes`           | **NO**  |
| `no`     | display         | `no`    | element           | `no`            | **NO**  |
| `no`     | display         | `no`    | property          | `yes`           | **NO**  |
| `no`     | display         | `no`    | property          | `no`            | **NO**  |
| `yes`    | display         | `no`    | element           | `yes`           | **YES** |
| `yes`    | display         | `no`    | element           | `no`            | **YES** |
| `yes`    | display         | `no`    | property          | `yes`           | **YES** |
| `yes`    | display         | `no`    | property          | `no`            | **YES** |
| `no`     | display         | `yes`   | element           | `yes`           | **NO**  |
| `no`     | display         | `yes`   | element           | `no`            | **NO**  |
| `no`     | display         | `yes`   | property          | `yes`           | **NO**  |
| `no`     | display         | `yes`   | property          | `no`            | **NO**  |
| `yes`    | display         | `yes`   | element           | `yes`           | **YES** |
| `yes`    | display         | `yes`   | element           | `no`            | **YES** |
| `yes`    | display         | `yes`   | property          | `yes`           | **YES** |
| `yes`    | display         | `yes`   | property          | `no`            | **YES** |
| `no`     | display_summary | `no`    | element           | `yes`           | **NO**  |
| `no`     | display_summary | `no`    | element           | `no`            | **NO**  |
| `no`     | display_summary | `no`    | property          | `yes`           | **NO**  |
| `no`     | display_summary | `no`    | property          | `no`            | **NO**  |
| `yes`    | display_summary | `no`    | element           | `yes`           | **YES** |
| `yes`    | display_summary | `no`    | element           | `no`            | **NO**  |
| `yes`    | display_summary | `no`    | property          | `yes`           | **YES** |
| `yes`    | display_summary | `no`    | property          | `no`            | **NO**  |
| `no`     | display_summary | `yes`   | element           | `yes`           | **NO**  |
| `no`     | display_summary | `yes`   | element           | `no`            | **NO**  |
| `no`     | display_summary | `yes`   | property          | `yes`           | **NO**  |
| `no`     | display_summary | `yes`   | property          | `no`            | **NO**  |
| `yes`    | display_summary | `yes`   | element           | `yes`           | **YES** |
| `yes`    | display_summary | `yes`   | element           | `no`            | **NO**  |
| `yes`    | display_summary | `yes`   | property          | `yes`           | **YES** |
| `yes`    | display_summary | `yes`   | property          | `no`            | **NO**  |
