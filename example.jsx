'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
    ArrowRight, 
    ShieldCheck, 
    Package, 
    Star, 
    ChevronRight, 
    Play, 
    Volume2, 
    VolumeX,
    CheckCircle2,
    Truck,
    Undo2,
    Music,
    Leaf
} from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { PRODUCTS } from '@/lib/constants/products';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TestimonialReviews } from '@/components/ui/testimonial-reviews';

const media = [
    { type: 'video', src: '/birdytutorial1.mp4', thumb: '/birdy-first.jpg' },
    { type: 'image', src: '/birdy-first.jpg' },
    { type: 'image', src: '/birdy1.jpg' },
    { type: 'image', src: '/birdy2.jpg' },
    { type: 'image', src: '/birdy-product2pcs.jpg' },
];

export default function ProductPage() {
    const { addItem, setCartOpen } = useCartStore();
    const [selectedMediaIdx, setSelectedMediaIdx] = useState(0);
    const [selectedVariantId, setSelectedVariantId] = useState("p_2_units");
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeMedia = media[selectedMediaIdx];
    const selectedVariant = PRODUCTS.find(v => v.id === selectedVariantId) || PRODUCTS[1];

    const handleAddToCart = () => {
        addItem({ 
            id: selectedVariant.id, 
            title: selectedVariant.title, 
            price: selectedVariant.price, 
            image: '/birdy-product2pcs.jpg', 
            quantity: 1 
        });
        setCartOpen(true);
        toast.success(`${selectedVariant.title} added to cart`);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl px-4 py-6 md:py-12">
                
                {/* ── Breadcrumbs ── */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-10">
                    <a href="/" className="hover:text-foreground">Home</a>
                    <ChevronRight className="w-4 h-4" />
                    <a href="/shop" className="hover:text-foreground">Shop</a>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">Original Birdy Whistle</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
                    
                    {/* ── 1. Media Gallery (Left/Top) ── */}
                    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
                        
                        {/* Thumbnails (Desktop side / Mobile bottom) */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide shrink-0">
                            {media.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedMediaIdx(i)}
                                    className={cn(
                                        "relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                                        selectedMediaIdx === i ? "border-primary shadow-md" : "border-transparent hover:border-border"
                                    )}
                                >
                                    <Image 
                                        src={item.type === 'video' ? item.thumb! : item.src} 
                                        alt={`Thumbnail ${i}`} 
                                        fill 
                                        className="object-cover" 
                                    />
                                    {item.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Main Media Viewer */}
                        <div className="flex-1 aspect-[4/5] relative rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl">
                            {activeMedia.type === 'video' ? (
                                <div className="w-full h-full relative group">
                                    <video
                                        ref={videoRef}
                                        src={activeMedia.src}
                                        autoPlay
                                        muted={isMuted}
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Video Controls */}
                                    <div className="absolute bottom-4 right-4 flex gap-2 overflow-hidden items-center group-hover:opacity-100 opacity-0 transition-opacity">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 border-0"
                                            onClick={() => setIsMuted(!isMuted)}
                                        >
                                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-primary/90 backdrop-blur-sm border-0 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">
                                            Tutorial Video
                                        </Badge>
                                    </div>
                                </div>
                            ) : (
                                <Image 
                                    src={activeMedia.src} 
                                    alt="Birdy Whistle Detail" 
                                    fill 
                                    className="object-cover animate-in fade-in duration-500" 
                                    priority
                                />
                            )}
                        </div>
                    </div>

                    {/* ── 2. Buy Section (Right/Below) ── */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="space-y-4 pb-6 border-b border-border/60">
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1 font-semibold uppercase tracking-wider text-[10px]">
                                    Amsterdam · Est. 1990
                                </Badge>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                    <span className="text-sm font-medium ml-1">4.9/5</span>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">The Original Birdy Whistle</h1>
                            <p className="text-muted-foreground text-lg italic leading-relaxed">
                                &quot;35 Years. One Whistle. Still Works.&quot;
                            </p>
                        </div>

                        {/* Pricing & Variants */}
                        <div className="py-8 space-y-6">
                            <div className="space-y-3">
                                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Quantity</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {PRODUCTS.filter(v => v.units < 50).map((variant) => {
                                        const isSelected = selectedVariantId === variant.id;
                                        return (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariantId(variant.id)}
                                                className={cn(
                                                    "relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left",
                                                    isSelected 
                                                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20" 
                                                        : "border-border/60 hover:border-border hover:bg-muted/30"
                                                )}
                                            >
                                                {variant.popular && (
                                                    <div className="absolute -top-3 left-4">
                                                        <Badge className="bg-primary hover:bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border-0 shadow-sm shadow-primary/20">
                                                            Most Popular
                                                        </Badge>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                                                    )}>
                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-base">{variant.title}</span>
                                                        <span className={cn("text-xs font-medium", variant.shipping === 'Free Shipping' ? 'text-primary' : 'text-muted-foreground')}>
                                                            {variant.shipping}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-lg font-bold">€{variant.price.toFixed(2)}</span>
                                                    {variant.originalPrice && (
                                                        <p className="text-xs text-muted-foreground/60 line-through">€{variant.originalPrice.toFixed(2)}</p>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button 
                                    size="lg" 
                                    className="w-full h-14 md:h-16 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all text-primary-foreground"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart — €{selectedVariant.price.toFixed(2)}
                                </Button>
                                <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-4">
                                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure Checkout</span>
                                    <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-green-500" /> Fast European Shipping</span>
                                </p>
                            </div>
                        </div>

                        {/* Trust Badges / Quick Ticks */}
                        <div className="space-y-3 pt-6 border-t border-border/60">
                            {[
                                "Real birds respond to it",
                                "Precision metal membrane, designed for 35+ years",
                                "Fits in your pocket — durable and outdoor-ready",
                                "Convincing bird call in under 60 seconds",
                                "30-Day Money Back Guarantee"
                            ].map((tick, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{tick}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── 3. Detail Sections (Below Top Section) ── */}
                <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-20">
                        
                        {/* Description Section */}
                        <section id="details" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight pb-4 border-b">Product Description</h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
                                <p className="text-lg text-foreground font-medium">
                                    Ronald Huisman has been perfecting this instrument on the streets of Amsterdam since 1990. It&apos;s not a toy — it&apos;s a precision acoustic tool.
                                </p>
                                <p>
                                    Designed on the Dam Square and refined over three and a half decades, the Original Birdy Whistle uses a unique metal resonator membrane that allows you to mimic dozens of bird species with remarkable accuracy. Whether you&apos;re a birdwatcher, a wildlife photographer, or just someone who loves the sound of nature, this whistle brings a new level of interaction with the world around you.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-10">
                                    <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                                        <Music className="w-8 h-8 text-primary mb-4" />
                                        <h4 className="font-bold text-foreground mb-2">Authentic Sound</h4>
                                        <p className="text-sm">The metal membrane replicates high-frequency bird calls that plastic imitations simply cannot match.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                                        <Leaf className="w-8 h-8 text-primary mb-4" />
                                        <h4 className="font-bold text-foreground mb-2">Nature Friendly</h4>
                                        <p className="text-sm">A non-invasive way to interact with local bird populations and learn their distinct calls.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How to Use Section */}
                        <section id="how-to-use" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight pb-4 border-b">How to Use</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { step: "01", title: "Placement", desc: "Place the whistle flat against the roof of your mouth, with the serrated edge facing towards your teeth." },
                                    { step: "02", title: "Moisten", desc: "Hold it there for a few seconds until the moisture of your mouth softens the membrane slightly." },
                                    { step: "03", title: "Breathe", desc: "Gently breathe through your mouth while making soft 'TI-TI-TI' or 'SCHHH' sounds with your tongue." }
                                ].map((step, i) => (
                                    <div key={i} className="space-y-4">
                                        <span className="text-4xl font-black text-primary/10 select-none">{step.step}</span>
                                        <h4 className="font-bold text-xl">{step.title}</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-950 text-white mt-10">
                                <p className="text-sm font-medium italic opacity-80">
                                    &quot;Don&apos;t be discouraged if you don&apos;t get it immediately. Most people find their voice within 60 seconds — once you feel the vibration, you&apos;ll never forget how to do it.&quot;
                                </p>
                            </div>
                        </section>

                        {/* Specs & Warranty */}
                        <section id="specs" className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight pb-4 border-b">Technical Specs & Warranty</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-xl flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Details</h4>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex justify-between border-b pb-2"><span>Material</span><span className="text-foreground font-medium">Precision-cut Metal / Membrane</span></li>
                                        <li className="flex justify-between border-b pb-2"><span>Origin</span><span className="text-foreground font-medium">Amsterdam, Netherlands</span></li>
                                        <li className="flex justify-between border-b pb-2"><span>Age Suitability</span><span className="text-foreground font-medium">6+ Years</span></li>
                                        <li className="flex justify-between border-b pb-2"><span>Dimensions</span><span className="text-foreground font-medium">Approx. 2.5cm width</span></li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-xl flex items-center gap-2 text-green-600"><ShieldCheck className="w-4 h-4" /> Guarantee</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Every whistle Ronald sells is backed by a <strong>30-Day Money Back Guarantee</strong>. If the whistle is defective or breaks under normal use, we will replace it or refund you — no questions asked.
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                                        We ship from the Netherlands, with average delivery times of 1-3 business days within the NL and 3-7 days across Europe.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ── Sidebar (Desktop only) ── */}
                    <aside className="hidden lg:block lg:col-span-4 self-start sticky top-28">
                        <div className="p-8 rounded-3xl bg-muted/20 border border-border/50 space-y-6 shadow-sm">
                            <div className="space-y-2">
                                <p className="text-2xl font-bold">€{selectedVariant.price.toFixed(2)}</p>
                                <p className="text-sm text-primary font-semibold">{selectedVariant.shipping}</p>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-border/60">
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <Truck className="w-5 h-5 text-muted-foreground" />
                                    <span>Fast Delivery Across Europe</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <Undo2 className="w-5 h-5 text-muted-foreground" />
                                    <span>30-Day Returns</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                                    <span>Stripe Secure Payments</span>
                                </div>
                            </div>
                            <Button 
                                className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ── REVIEWS ────────────────────────────────────────────── */}
            <div className="border-t mt-20">
                <TestimonialReviews />
            </div>

            {/* ── STICKY MOBILE BOTTOM BAR ───────────────────────────── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-4 border-t border-border/50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between animate-in slide-in-from-bottom-full duration-500">
                <div>
                    <p className="font-bold text-lg leading-none pt-1">
                        €{selectedVariant.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {selectedVariant.title}
                    </p>
                </div>
                <Button 
                    onClick={handleAddToCart}
                    className="rounded-full px-8 font-semibold shadow-lg"
                >
                    Buy Now
                </Button>
            </div>

        </div>
    );
}