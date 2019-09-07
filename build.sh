cd frontend

# Builds the frontend
npm run build

# Move files at the build root inside a root subdirectory
mkdir -p build/root
for file in $(ls build | grep -E -v '^(index\.html|static|root)$'); do
    mv "build/$file" build/root;
done

cd ..

cd backend
pipenv shell
cd price_checker
./manage.py collectstatic --no-input