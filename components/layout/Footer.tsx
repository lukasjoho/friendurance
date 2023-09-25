import Container from './Container';

const Footer = () => {
  return (
    <div className="border-t py-4">
      <Container>
        <p className="text-center text-sm text-muted-foreground">
          Build by{' '}
          <a
            href="https://lukashoppe.com"
            target="_blank"
            className="underline"
          >
            Lukas
          </a>{' '}
          on his balcony with lots of cold post-workout smoothies.🥤
        </p>
      </Container>
    </div>
  );
};

export default Footer;
