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
	 i->>'numerser_component', CAST(i->>'pfcod_proveed' AS INTEGER), CAST(i->>'pfcod_equipo' AS INTEGER) );
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


-- actualizacion 18/10/21
--esta funcion hace relacion a la ruta saveReport para guardar una ficha general de los equipos
CREATE OR REPLACE PROCEDURE public.guardarcompone(cod_equipo character varying, descrip_equipo character varying, 
												  fechactrol_equipo date, firma_equipo character varying, 
												  pfced_usuario character varying, pfcod_departament integer, 
												  arraycomponents text, pfcod_proveed integer, nomb_soft character varying, 
												  descrip_soft character varying, licencia_soft text)
 LANGUAGE plpgsql
AS $procedure$
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
	 i->>'numerser_component', CAST(i->>'pfcod_proveed' AS INTEGER), i->>'pfcod_equipo' );
  END LOOP;
  INSERT INTO tmaesoft( nomb_soft, descrip_soft, licencia_soft, pfcod_proveed, pfcod_equipo) 
	 VALUES ( nomb_soft, descrip_soft, licencia_soft, pfcod_proveed, cod_equipo);
END;
$procedure$


-- guardar el reprte general de red hace referencia con la ruta /saveReportRed

CREATE OR REPLACE PROCEDURE public.guardareportRed(
	cod_fichared character varying,observacion_fichared character varying, 
												  pfced_usuario character varying, 
												  pfcedtec_usuario character varying,
											      pfcedjef_usuario character varying,
												  componentesred text)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
 omgjson json := componentesred;
 i json;
BEGIN
INSERT INTO tmaefichared
	(cod_fichared,observacion_fichared, pfced_usuario, 
	 pfcedtec_usuario, pfcedjef_usuario) VALUES ( cod_fichared,observacion_fichared, pfced_usuario, 
												 pfcedtec_usuario, pfcedjef_usuario);

	FOR i IN SELECT * FROM json_array_elements(omgjson)
  	LOOP
	 INSERT INTO tmaecomponentred
	(tipo_componentred, codserial_componentred, 
	 descrip_componentred, marca_componentred, modelo_componentred, 
	 macaddress_componentred, ipaddress_componentred
, numerser_componentred, pfcod_fichared, pfcod_departament) VALUES (i->>'tipo_componentred',i->>'codserial_componentred', 
			 i->>'descrip_componentred', i->>'marca_componentred', 
	 		 i->>'modelo_componentred', i->>'macaddress_componentred' , 
			 i->>'ipaddress_componentred',i->>'numerser_componentred',
			i->>'pfcod_fichared', CAST(i->>'pfcod_departament' AS INTEGER));
  END LOOP;
END;
$procedure$