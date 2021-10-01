
---vista general para resumir entre las tablas
create view vtmaegeneral as select cod_equipo, nomb_usuar, nomb_departament, nombre_proveed,
            fechadquis_proveed, fechverf_component
            from thistctrolequipo 
            inner join tmaedepartament on tmaedepartament.cod_departament = thistctrolequipo.pfcod_departament
            inner join tmaeusuar on tmaeusuar.cedul_usuar = thistctrolequipo.pfced_usuario
            inner join tmaecomponent on tmaecomponent.pfcod_equipo = thistctrolequipo.cod_equipo
            inner join thistproveed on thistproveed.cod_proveed = tmaecomponent.pfcod_proveed

