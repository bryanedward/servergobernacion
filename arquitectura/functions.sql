--function fpr insert records

create or replace PROCEDURE  guardarcompone(cod_equipo varchar,descrip_equipo varchar,fechactrol_equipo date, 
										  firma_equipo varchar,pfced_usuario varchar, pfcod_departament integer,
										  arrayComponents text, pfcod_proveed integer,nomb_soft varchar, 
										descrip_soft varchar, licencia_soft TEXT)	 
AS
$$
DECLARE
 omgjson json := arrayComponents;
 i json;
BEGIN
	INSERT INTO thistctrolequipo VALUES (cod_equipo, descrip_equipo,fechactrol_equipo, firma_equipo, pfced_usuario, 
										 pfcod_departament);	
	FOR i IN SELECT * FROM json_array_elements(omgjson)
  	LOOP
	INSERT INTO tmaecomponent (nombre_component, descrip_component, marca_component, model_component, 
	 numerser_component, pfcod_proveed, pfcod_equipo) 
	 VALUES ( i->>'nombre_component', i->>'descrip_component', i->>'marca_component', i->>'model_component', 
	 i->>'numerser_component', CAST(i->>'pfcod_proveed' AS INTEGER), CAST(i->>'cod_equipo' AS INTEGER) );
  END LOOP;
  INSERT INTO tmaesoft( nomb_soft, descrip_soft, licencia_soft, pfcod_proveed, pfcod_equipo) 
	 VALUES ( nomb_soft, descrip_soft, licencia_soft, pfcod_proveed, cod_equipo);
END;
$$
LANGUAGE 'plpgsql';



-- function for the method getOneComponent
CREATE OR REPLACE FUNCTION consultComponent(cedula varchar)
RETURNS
	TABLE(
		cod_component integer,
		marca_component varchar,
		model_component varchar,
		numerser_component varchar
	)
AS
$$
BEGIN
	RETURN QUERY
		SELECT   
		tmaecomponent.cod_component,
		tmaecomponent.marca_component, 
		tmaecomponent.model_component,
		tmaecomponent.numerser_component
		FROM tmaecomponent INNER JOIN thistctrolequipo
		ON thistctrolequipo.cod_equipo = tmaecomponent.pfcod_equipo
		WHERE pfced_usuario = cedula;
END;
$$
LANGUAGE 'plpgsql';
