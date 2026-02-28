-- Update the handle_new_user function to include age, gender, and mobile_number from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, age, gender, mobile_number)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''), 
    new.email,
    NULLIF(new.raw_user_meta_data ->> 'age', '')::integer,
    new.raw_user_meta_data ->> 'gender',
    new.raw_user_meta_data ->> 'mobile_number'
  );
  RETURN new;
END;
$$;