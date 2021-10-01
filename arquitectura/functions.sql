
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
